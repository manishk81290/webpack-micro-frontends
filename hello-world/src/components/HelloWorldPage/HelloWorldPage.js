import Button from './../ButtonComponent/Button';
import Header from './../HeaderComponent/Header';

class HelloWorldPage{
    render(){
        const hdr=new Header();
        hdr.render("INDEX PAGE",process.env.NODE_ENV);
        const btn=new Button();
        btn.render();
    }
}

export default HelloWorldPage;
