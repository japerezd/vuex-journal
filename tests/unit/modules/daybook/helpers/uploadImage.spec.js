import cloudinary from 'cloudinary';
import axios from 'axios';
import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.config({
    cloud_name: 'dumihjct9',
    api_key: '378127813585878',
    api_secret: 'Tg7NQFcyb1aQP4u4mYLiVuzSgLk',
})

describe('pruebas en el uploadImage', () => {
    test('debe de cargar un archivo y retornar el url', async (done) => {
        const { data } = await axios.get('https://res.cloudinary.com/dumihjct9/image/upload/v1606337041/zbgxixynka90uizbwftn.jpg', {
            responseType: 'arraybuffer'
        });

        const file = new File([data], 'foto.jpg')
        const url = await uploadImage(file);

        expect(typeof url).toBe('string');

        // tomar el ID
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        })
    });
    
});
