import { useSelector } from 'react-redux';
import { selectFormCompleted } from '../store';

export default function RegisterStatus() {
  const formCompleted = useSelector(selectFormCompleted);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-[#dde2d5] bg-white px-4 py-2 shadow-md">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded text-sm font-bold text-white ${formCompleted ? 'bg-green-600' : 'bg-red-600'}`}
        aria-hidden="true"
      >
        {formCompleted ? '✓' : '✕'}
      </span>
      <span className="text-sm font-semibold">
        {formCompleted ? 'Form Dolduruldu Teşekkürler :)' : 'Form henüz doldurulmadı!!!'}
      </span>
    </div>
  );
}
