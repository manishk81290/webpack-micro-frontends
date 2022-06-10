import Header from './../HeaderComponent/Header';
import Kiwi from './../KiwiComponent/Kiwi';

class KiwiPage{
    render(){
        const hdr=new Header();
        hdr.render('KIWI IMAGE PAGE',process.env.NODE_ENV);
        const kw=new Kiwi();
        kw.render();

        import('ImageCaptionApp/ImageCaptionPage').then(ImageCaptionPageModule=>{
            const ImageCaption=ImageCaptionPageModule.default;
            const imgCap=new ImageCaption();
            imgCap.render('Kiwi Fruit - from New Zealand...');
        })
    }
}

export default KiwiPage;
