export default function Home() {
  return (
    <section className="w-full h-[65.39vh] flex relative">
      <div className="absolute z-0 grid grid-cols-5 gap-0 w-full max-w-[1300px] h-[450px] m-auto top-0 bottom-0 left-0 right-0 rounded-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div className="w-full bg-cover bg-no-repeat bg-first_banner" />
        <div className="w-full bg-cover bg-no-repeat bg-second_banner" />
        <div className="w-full bg-cover bg-no-repeat bg-third_banner" />
        <div className="w-full bg-cover bg-no-repeat bg-fourth_banner" />
        <div className="w-full bg-cover bg-no-repeat bg-fifth_banner" />
      </div>
      <div className="bg-[#000000b3] z-10 flex justify-center items-center flex-col flex-wrap w-full max-w-[1300px] h-[450px] m-auto rounded-lg px-4 sm:px-8">
        <h1 className="text-6xl sm:text-5xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#6800ff] to-[#ff00ff] text-transparent bg-clip-text">
          What’s our movie pick?
        </h1>
        <p className="text-xl sm:text-lg text-white mt-4">
          All the details, just a click away.
        </p>
      </div>
    </section>
  );
}
