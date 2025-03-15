async function imageToBase64(imageUrl) {
    try {
        // 使用 fetch 获取图片的二进制数据
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // 创建 FileReader 对象
        const reader = new FileReader();

        // 返回一个 Promise，在读取完成后解析 base64 编码的字符串
        return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error converting image to base64:', error);
        throw error;
    }
}

// 示例用法
imageToBase64('http://127.0.0.1:5000/static/b30_image/Background_scenery_Chap9.jpg')
    .then(base64 => console.log(base64))
    .catch(error => console.error(error));
