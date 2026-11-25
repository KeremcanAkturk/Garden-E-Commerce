export default function LessonCard({ number, title, topic, description, file }) {
  return (
    <article className="rounded-2xl border border-[#dde2d5] bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-8 flex items-center justify-between"><span className="text-sm text-[#8c9682]">/{number}</span><span className="rounded-full bg-[#f1f4e9] px-3 py-1 text-xs font-medium text-[#637749]">{topic}</span></div>
      <h3 className="mb-3 text-xl font-semibold leading-snug">{title}</h3>
      <p className="text-sm leading-6 text-[#758071]">{description}</p>
      <p className="mt-6 break-words border-t border-[#eef0e9] pt-4 font-mono text-xs text-[#778363]">{file}</p>
    </article>
  );
}
