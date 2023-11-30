"use client"

import { App, Image, Upload } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { useState } from "react"

export default function UserImage(props: any) {
  const { message } = App.useApp()
  const [fileList, setFileList] = useState<any[]>([])
  const [previewUrl, setPreviewUrl] = useState<string>()

  if (props.value && fileList[0]?.name != props.value) {
    const url = process.env.NEXT_PUBLIC_BACKEND + props.value
    setFileList([{ name: props.value, url, uid: props.value }])
  }

  function onUploadChange({ file, fileList }: UploadChangeParam) {

    if (file.status === 'uploading') setFileList(fileList)
    if (file.status === 'removed') {
      setFileList([])
      props.onChange(undefined)
    }

    if (file.status === 'done' && file.response) {
      const link = file.response.link
      const url = process.env.NEXT_PUBLIC_BACKEND + link
      setFileList([{ url, name: link, uid: link, status: "done" }])
      props.onChange(link)
    }

    if (file.status === 'error' && file.response) {
      fileList.pop()
      setFileList(fileList)
      message.error(file.response.message)
    }
  }

  function onPreview(file: any) {
    setPreviewUrl(file.url)
  }

  function onVisibleChange(visible: boolean) {
    if (!visible) setPreviewUrl(undefined)
  }

  return (
    <>
      {previewUrl && <Image
        style={{ display: "none" }}
        preview={{ visible: true, onVisibleChange }}
        src={previewUrl} />}
        
      <Upload
        name="file"
        action={process.env.NEXT_PUBLIC_BACKEND + "/users/user-image"}
        onChange={onUploadChange}
        maxCount={2}
        accept=".jpg"
        fileList={fileList}
        onPreview={onPreview}
        listType="picture-card"
      >
        {fileList.length != 2 && "Upload"}
      </Upload>
    </>
  )
}
