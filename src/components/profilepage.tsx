import React from 'react'

export default function ProfilePage() {
    return (
        <div className='flex flex-row justify-between px-[152px] py-[152px] '>
            <div className='text-white flex flex-col items-start bg-black h-[415x] w-[418px] justify-between'>
                <div className='flex flex-col items-start text-base/20'>
                    <h1 className='text-[96px] font-bold'>Hi,</h1>
                    <h2 className='text-[70px] font-bold '>I'm Aldren</h2>
                </div>
                <p className='text-left text-[25px]/7'>I’m a Software developer <br />
                    with experience in Mobile, <br />
                    Web, and AI development.
                </p>
                <button className='bg-[#75C310] rounded-[30px] w-[220px] h-[56px] text-[20px] font-bold'>
                    Go to portfolio
                </button>
            </div>
            <div className='bg-black h-[415px] w-[418px]'>
                <img src="/circle_profile.png" alt="Profile" className='h-full w-full object-cover rounded-[20px]' />
            </div>
        </div>
    )
}
