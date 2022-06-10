import './ImageCaption.scss';

class ImageCaption{
    render(captionText){
        const p=document.createElement('p');
        p.innerHTML=captionText;
        p.classList.add('caption-style');
        const body=document.querySelector('body');
        body.appendChild(p);
    }
}

export default ImageCaption;