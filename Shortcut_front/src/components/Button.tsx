function Button({ text }: { text: string }) {
  return (
    <button className="text-2xl bg-green-400 rounded-xl px-4 py-2 w-1/3 hover:scale-105">
      {text}
    </button>
  );
}

export default Button