import React, { useRef, useState } from 'react'
import {
  AttachFile,
  SaveAlt,
  Clear,
  SettingsBackupRestore,
} from '@material-ui/icons'
import ReCAPTCHA from 'react-google-recaptcha'

import { useFile } from 'hooks'
import { fileDetailsFactory } from 'factory'

import styles from './index.module.scss'

const imageTypes = ['jpeg', 'jpg', 'png', 'heic', 'hevc', 'gif', 'apng', 'svg']

const Home = () => {
  const reCaptchaRef = useRef()
  const [captcha, setCaptcha] = useState(null)

  const { file, setFile, sendFile, loading, data, setData } = useFile()

  const fileDetails = file && fileDetailsFactory(file)
  const disableSubmit = !file || loading || !captcha

  const handleChange = (e) => {
    setFile(e.target.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const recaptchaValue = reCaptchaRef.current.getValue()
    // if (!recaptchaValue) return
    await sendFile(recaptchaValue)
  }

  const handleClickClear = () => {
    setFile(null)
    setCaptcha(null)
  }

  const handleExpiredCaptcha = () => {
    setCaptcha(null)
  }

  const handleClearAll = () => {
    setFile(null)
    setData(null)
    setCaptcha(null)
  }

  const handleChangeCaptcha = (value) => {
    setCaptcha(value)
  }

  const renderPreview = () => {
    const showPreview =
      fileDetails && imageTypes.includes(fileDetails?.type?.toLowerCase())

    if (showPreview)
      return (
        <div className={styles.previewContainer}>
          <Clear
            size={12}
            className={styles.clearIcon}
            onClick={handleClickClear}
          />
          <img src={URL.createObjectURL(file[0])} className={styles.preview} />
        </div>
      )
    return (
      <div className={styles.previewDefault}>
        <Clear
          size={12}
          className={styles.clearIcon}
          onClick={handleClickClear}
        />
        <AttachFile size={12} className={styles.fileIcon} />
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Transform files into links for a<br /> short period of time
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          id='file'
          type='file'
          onChange={handleChange}
          className={styles.input}
        />
        <label htmlFor='file' className={styles.label}>
          <SaveAlt size={12} className={styles.icon} />
          Choose a file
        </label>
        {file && renderPreview()}
        <span className={styles.description}>
          {fileDetails && fileDetails.fullName}
        </span>
        <span className={styles.description}>
          {fileDetails && fileDetails.size}
        </span>
        {file && (
          <ReCAPTCHA
            className={styles.captcha}
            ref={reCaptchaRef}
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            onChange={handleChangeCaptcha}
            onExpired={handleExpiredCaptcha}
          />
        )}
        <button
          type='submit'
          disabled={!file}
          className={styles.button}
          style={{
            opacity: disableSubmit && 0.6,
            cursor: disableSubmit && 'not-allowed',
          }}
        >
          {loading ? 'loading...' : 'Generate link'}
        </button>
        {data?.Location && (
          <>
            <h2 className={styles.footer}>Your link to the file is:</h2>
            <a className={styles.link} href={data.Location}>
              {data.Location}
            </a>
          </>
        )}
      </form>
      {data && (
        <div className={styles.again} onClick={handleClearAll}>
          <SettingsBackupRestore size={12} className={styles.icon} />
          <h3>Clear all and do it again :P</h3>
        </div>
      )}
    </div>
  )
}

export default Home
