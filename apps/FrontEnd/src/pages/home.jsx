import React from 'react'
import Navbar from '../component/nav'
import Cocktail from '../assets/cocktail.jpg'

function home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-130 z-10 top-0 left-0">
        <img src={Cocktail} alt="Background" className="w-full h-full object-cover opacity-95 brightness-70"/>
      </div>

      <div class="space-y-8">
        <section class="p-10  mb-0">

        </section>

        <section class="p-10 bg-white mb-0">

        </section>

        <section class="p-10">

        </section>
      </div>


      {/*     
      <div className="text-center mt-32">
        <h2 className="text-center mb-32 text-7xl tracking-widest">
          QUEUETY
        </h2>
        <div className="max-w-lg">
          <p className="text-center tracking-widest">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, in? Aliquam eligendi minus consequuntur enim officia perspiciatis dolore at dicta ipsa recusandae dolor necessitatibus voluptatibus eaque sequi exercitationem, nulla, voluptas quibusdam eos! Dolorum facere beatae, ipsum atque ratione totam sed blanditiis odio. Atque vel fuga reprehenderit voluptate rerum corporis nulla. Repellat maxime pariatur similique quibusdam. Sed blanditiis esse, dolorem eaque maiores omnis in ullam rerum sunt excepturi libero consequatur nam rem illo perferendis distinctio illum dicta. Quia fuga hic dolorum, eaque voluptate, odio culpa asperiores magnam accusantium sit ad, quis nobis. Aspernatur quae ipsa dolorem nostrum deleniti, delectus commodi a?
          </p>
        </div>
      </div> */}
    </>
  )
}

export default home