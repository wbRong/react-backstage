import React from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// 上传之前的限制
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG类型图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过2M');
  }
  return isJpgOrPng && isLt2M;
}

export default function Means() {
  const [loading, setLoading] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState("")

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false)
        setImageUrl(imageUrl)
      }
      );
    }
  };


  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://47.93.114.103:6688/manage/upload"
        beforeUpload={beforeUpload}
        headers={{
          "cms-token": localStorage.getItem('cms-token')
        }}
        onChange={handleChange}
      >
        {imageUrl ? <img src={'http://47.93.114.103:6688/'+imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  )
}

