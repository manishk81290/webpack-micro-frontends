import './Button.css';
import './Button.style.scss';
class Button{
    btnClass='btn-style';
    render(){
        const button=document.createElement('button');
        button.innerHTML="Add text to page";
        button.classList.add(this.btnClass);
        const body=document.querySelector('body');
        body.classList.add('bdy-style');
        button.onclick=function(){
            const p=document.createElement('p');
            p.innerHTML="New text added";
            p.classList.add('txt-style');
            body.appendChild(p);
        }
        body.appendChild(button);
    }
}

export default Button;