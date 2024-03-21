import CardThumbnail from "../../Components/CardThumbnail/CardThumbnail"


function Home(props) {
  return (
    <div>
      <div>


        <div className="heading text-center font-bold text-2xl m-5 text-gray-100">Full Responsive Video Cards</div>

        <div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">

        <CardThumbnail/>
        <CardThumbnail/>
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />
          <CardThumbnail />  
           <CardThumbnail/>
        </div>
      </div>

    </div>
    
  )
}

export default Home
