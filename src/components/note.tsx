import * as Dialog from '@radix-ui/react-dialog';
import { t } from 'i18next';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

export function NoteCard() {
  const SpeechRecognitionAPI =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechRecognition = new SpeechRecognitionAPI();

  const [isRecording, setIsRecording] = useState(false);
  const [shouldShowOnboarding, setShoulOnboarding] = useState(true);

  const [content, setContent] = useState(() => {
    const contentOnStorage = localStorage.getItem('content');
    if (contentOnStorage) {
      return JSON.parse(contentOnStorage);
    }
    return;
  });

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      'speechRecognition' in window || 'webkitSpeechRecognition' in window;
    if (!isSpeechRecognitionAPIAvailable) {
      alert('Infelismente seu navegador não suporta a API de gravação');
      return;
    }

    setIsRecording(true);
    setShoulOnboarding(false);

    speechRecognition.lang = 'pt-BR';
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, '');

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);
    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }

  function handleStartNote() {
    setShoulOnboarding(false);
  }

  function handleSaveNote(event: FormEvent) {
    if (content === '') return;
    event.preventDefault();
    toast.success('Descrição salva com sucesso!!');
    localStorage.setItem('content', JSON.stringify(content));
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === '') setShoulOnboarding(true);
  }

  function handleDeleteContent() {
    setContent('');
    const resetaContent = '';
    localStorage.setItem('content', JSON.stringify(resetaContent));
    window.location.reload();
  }
  return (
    <section className="flex flex-col my-[22.4px] h-auto">
      <Dialog.Root>
        <Dialog.Trigger className=" max-w[380px] h-auto rounded-md text-left bg-[#fff] flex flex-col p-5 gap-3 overflow-hidden border border-color[rgba(223, 220, 200, 0.5)] relative hover:ring-1 hover:ring-offset-slate-200 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
          <span className="text-sm font-medium text-slate-300">
            {t('Click to add a recipe description')}
          </span>

          <p className="text-sm leading-6 text-slate-600">{content}</p>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] border border-color[rgba(223, 220, 200, 0.5)] bg-[#fff] md:rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute right-0 top-0 bg-black p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <form className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-400">
                  {t(
                    'Add or edit recipe description choosing the best one option',
                  )}
                </span>
                {shouldShowOnboarding ? (
                  content ? (
                    <p className="text-sm leading-6 text-slate-400">
                      {t('Edit')}{' '}
                      <button
                        onClick={handleStartRecording}
                        className="font-medium text-[#f3dac9] hover:underline"
                      >
                        {t('recording an audio description')}
                      </button>{' '}
                      {t('Or')}{' '}
                      <button
                        onClick={handleStartNote}
                        className="font-medium text-[#f3dac9] hover:underline"
                      >
                        {t('just type to edit your description')}
                      </button>
                    </p>
                  ) : (
                    <p className="text-sm leading-6 text-slate-400">
                      {t('Start')}{' '}
                      <button
                        type="button"
                        onClick={handleStartRecording}
                        className="font-medium text-[#f3dac9] hover:underline"
                      >
                        {t('recording an audio description')}
                      </button>{' '}
                      {t('Or')}{' '}
                      <button
                        type="button"
                        onClick={handleStartNote}
                        className="font-medium text-[#f3dac9] hover:underline"
                      >
                        {t('just enter your description')}
                      </button>
                    </p>
                  )
                ) : (
                  <textarea
                    autoFocus
                    className="text-sm leading-6 text-slate-600 bg-transparent resize-none flex-1 outline-none"
                    onChange={handleContentChanged}
                    value={content}
                  />
                )}
              </div>

              {isRecording ? (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
                >
                  <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                  {t('Recording!! (click to stop)')}
                </button>
              ) : (
                <button
                  onClick={handleSaveNote}
                  className=" bg-black hover:bg-slate-700 mt- py-4 text-center text-sm text-slate-300 outline-none font-medium grou"
                  type="button"
                >
                  {t('Do you want to')}{' '}
                  <span className="text-lime-400 group-hover:underline">
                    {t('save this description')}
                  </span>
                  ?
                </button>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <button
        onClick={handleDeleteContent}
        className="bg-orange-400 hover:ring-1 hover:ring-offset-slate-200 border border-color[rgba(223, 220, 200, 0.5)] rounded-lg w-auto mt-1 p-1 font-semibold text-sm"
      >
        {t('Clean all')}
      </button>
    </section>
  );
}
