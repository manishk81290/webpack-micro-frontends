import KiwiImage from './Kiwi-fruit.jpeg';
import './Kiwi.scss';

class Kiwi{
    render(){
        const img=document.createElement('img');
        img.alt="Kiwi Image";
        img.src=KiwiImage;
        img.classList.add('img-style');
        const body=document.querySelector('body');
        body.appendChild(img);
    }
}

export default Kiwi;