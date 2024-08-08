// // src/components/AddPostModal.js
// import React, { useState } from 'react';
// import { Modal, Form, Input, Button } from 'antd';
// import { addBlogPost } from '../APICALLS/blog';

// const AddPostModal = ({ isOpen, onRequestClose }) => {
//   const [form] = Form.useForm();



//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();
//       const response = await addBlogPost(values);
//       console.log('Blog post added:', response);
      
      
//       onRequestClose();
//     } catch (error) {
//       console.error('Error adding blog post:', error);
//     }
//   };
//   return

//     <Modal
//       title="Add Post"
//       visible={isOpen}
//       onCancel={onRequestClose}
//       footer={null}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleSubmit}
//       >
//         <Form.Item
//           name="title"
//           label="Title"
//           rules={[{ required: true, message: 'Please input the title!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="content"
//           label="Content"
//           rules={[{ required: true, message: 'Please input the content!' }]}
//         >
//           <Input.TextArea />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
  
// };

// export default AddPostModal;



import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { addBlogPost } from '../APICALLS/blog';

const AddPostModal = ({Setflag,isOpen, onRequestClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const response = await addBlogPost(values);
      console.log('Blog post added:', response);
      Setflag(false)
      form.resetFields();
      onRequestClose();
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  };

  return (
    <Modal
      title="Add Post"
      visible={isOpen}
      onCancel={onRequestClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
