import Man from "./mangad";


export default function DigitalGrid({ title, data }) {

  
  return (
    <div className="w-[87%] mt-7 ml-auto mr-auto h-fit mb-1">
      <p className="text-xl text-white fon">
        {title}
      </p>
      <div className="block sm:hidden mt-10 grid grid-cols-2 gap-4 items-center justify-center h-fit mb-1">
        {data.books.slice(0, 6).map((book, index) => (
          <Man key={index} name={book.title} imagex={book.image} link={book.link} price={book.price} tags={book.tags} />
        ))}
      </div>
      <div className="hidden sm:grid mt-10 grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-9 gap-4 items-center justify-center h-fit mb-1">
        {data.books.map((book, index) => (
          <Man key={index} name={book.title} imagex={book.image} link={book.link} price={book.price} tags={book.tags} />
        ))}
      </div>
    </div>
  );
}