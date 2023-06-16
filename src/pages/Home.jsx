import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import icon from '../assets/images/icon-dice.svg'
import dividerDesk from '../assets/images/pattern-divider-desktop.svg'
import dividerMobile from '../assets/images/pattern-divider-mobile.svg'
import Loading from '../components/Loading'

const Home = () => {

  const [advice, setAdvice] = useState('');
  const [id, setId] = useState('');
  const [button, setButton] = useState(0)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        const id = data.slip.id;
        const advice = data.slip.advice;
        setId(id);
        setAdvice(advice);
        setLoading(false)
      })
      .catch(error => {
        console.log('Error fetching advice:', error);
      });
  }, [button]);

  function handleClick() {

    setButton((current) => current + 1)

  }

  return (
    <>
      <section className='w-screen h-screen flex justify-center items-center font-Manrope bg-[#262b35]'>
        {loading && <Loading />}
        <div className='relative w-full md:w-fit h-fit mx-6 px-8 md:px-14 pt-10 pb-16 flex flex-col gap-6 justify-center items-center bg-[#363c49] rounded-xl'>
          <h1 className='uppercase text-[#87fbaf] tracking-[4px] text-xs md:text-sm font-medium'>Advice #{id}</h1>
          <p className='text-blue-100 font-bold text-2xl md:text-3xl md:w-[450px] text-center'>&#8220; {advice} &#8221;</p>
          <img className='mt-4 hidden md:block' src={dividerDesk} alt="divider desktop" />
          <img className='mt-4 block md:hidden' src={dividerMobile} alt="divider mobile" />
          <button onClick={handleClick} type='button' className='absolute -bottom-6 w-12 h-12 bg-[#87fbb0] duration-500 shadow hover:shadow-3xl shadow-[#87fbb0] rounded-full flex justify-center items-center'><img src={icon} alt="icon" /></button>
        </div>
      </section>
    </>
  )
}

export default Home