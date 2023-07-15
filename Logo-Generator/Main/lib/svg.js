//Render function to display logo for each of the shapes

class SVG {
    constructor(){
        this.text= ""
        this.shape="";
    }

    render(){
        return ` <svg version="1.1"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">
        
        ${this.shape}
        ${this.text}
        </svg> `   
    }

    selectedShape(shape) {
        this.shape=shape.render();
    }
    setText(message, textColor){
        this.text=` <text
        x="150" 
        y="125" font-size="60"
        text-anchor="middle" 
        fill= '${textColor}'>${message}
        </text>`
    }
}

module.exports = SVG;