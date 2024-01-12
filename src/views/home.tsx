import { FaStar } from "react-icons/fa6";

export const HomePage = () => {
    const comp=[{name:"facebook",rating:3},{name:"google",rating:5}]
    const Rating = (value:number) => (
        <div className="flex flex-row">
          {[...Array(10)].map((_, index) => (
            <FaStar
              key={index}
              className={index < value ? 'text-yellow-500' : 'text-gray-400'}
            />
          ))}
        </div>
    )
    return (
        <div className="text-3xl text-green-800 font-bold underline h-full w-full flex flex-col items-center">
            Home Page
            {comp.map(element =>{ return (
                <div className="h-24 border-4 border-black rounded w-2/3 text-left p-1 m-1">
                    {element.name}
                    {
                        Rating(element.rating)
                    }
                </div>
            )})}
        </div>
    )
}