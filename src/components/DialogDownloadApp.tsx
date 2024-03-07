import { NotificationIcon } from '@assets/icons'
import Image from 'next/image'
import logo from '../../../public/assets/logo/Sasom_Logo_2022_Edited 1.svg'
import { PRODUCT_URL } from '@src/constants'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from 'react-use'

export default function DialogDownloadApp() {
  const { t } = useTranslation()
  const [open, toggle] = useToggle(false)

  return (
    <>
      <div className='flex cursor-pointer items-center p-2' onClick={toggle}>
        <NotificationIcon color='#969696' />
      </div>

      {open && (
        <section
          className='fixed left-0 right-0 top-0 z-[10000] flex h-full items-center justify-center bg-black/50'
          onClick={toggle}
        >
          <article
            className={`${
              open ? 'scale-100 opacity-100 transition' : 'scale-95 opacity-0 transition' // ปรับค่า scale และ opacity ให้มัน smooth
            } relative flex max-w-[340px] flex-col items-center justify-center gap-6 rounded-[20px] bg-white p-8 shadow-md transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseIcon className='absolute right-4 top-4 cursor-pointer' onClick={toggle} />
            <Image src={logo} width={84} height={84} alt='logo' className='rounded-[16.8px] bg-black' />
            <div className='flex flex-col items-center gap-4'>
              <Typography className='text-base font-medium'>DOWNLOAD OUR APP</Typography>
              <Typography className='text-center text-sm font-normal'>{t('ENJOY_EXCLUSIVE_DEALS')}</Typography>
            </div>
            <div className='flex gap-4'>
              <figure className='relative m-0 !min-h-[10px] !min-w-[119px]'>
                <Image
                  src={`${PRODUCT_URL}/app_store_button.png`}
                  alt='sasom-app-store-button'
                  layout='fill'
                  onClick={() => {
                    // logClevertapClickEvent()
                    window.open('https://apps.apple.com/us/app/sasom/id1545536161', '_blank')
                  }}
                  className='cursor-pointer'
                />
              </figure>
              <figure className='relative m-0 !min-h-[40px] !min-w-[134px]'>
                <Image
                  src={`${PRODUCT_URL}/google_play_button.png`}
                  alt='sasom-google-play-button'
                  layout='fill'
                  onClick={() => {
                    // logClevertapClickEvent()
                    window.open('https://play.google.com/store/apps/details?id=com.sasomnative', '_blank')
                  }}
                  className='cursor-pointer'
                />
              </figure>
            </div>
          </article>
        </section>
      )}
    </>
  )
}
