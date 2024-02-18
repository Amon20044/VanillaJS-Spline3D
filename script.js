import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/O7a2SxjoOb-nkzDL/scene.splinecode');

var textValue = '0';
var firstTerm = '';
var currentOperation = '';
var cleanOnDigit = false;

//Keyboard controls
app.addEventListener('keyUp', (e) => {
    switch (e.target.name){
        //digits
        case '0':
            //Using operators entering new digits will cleans the display
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '0';
            break;
        case '1':
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '1';
            break;
        case '2':
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '2';
            break;
        case '3':
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '3';
            break;
        case '4':
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '4';
            break;
        case '5':
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '5';
            break;
        case '6':
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '6';
            break;
        case '7':
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '7';
            break;
        case '8':
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '8';
            break;
        case '9':
            if(cleanOnDigit) {textValue = ""; cleanOnDigit = false;}
            textValue += '9';
            break;
        //operations
        case '=':
            //Highlight a selected operator key and turn off other operator keys !FIX LATER if custom functions are added for Spline
            app.emitEvent('mouseDown', '=controller');
            app.emitEvent('mouseUp', '+controller');
            app.emitEvent('mouseUp', '-controller');
            app.emitEvent('mouseUp', '*controller');
            app.emitEvent('mouseUp', '/controller');
            switch(currentOperation){
                case '+':
                    textValue = (Number(firstTerm) + Number(textValue)).toString();
                    updateDisplay();
                    break;
                case '-':
                    textValue = (Number(firstTerm) - Number(textValue)).toString();
                    updateDisplay();
                    break;
                case '*':
                    textValue = (Number(firstTerm) * Number(textValue)).toString();
                    updateDisplay(); 
                    break; 
                case '/':
                    textValue = (Number(firstTerm) / Number(textValue)).toString();
                    updateDisplay();  
                    break;
            }
            cleanOnDigit = true;
            break;
        case '+':
            app.emitEvent('mouseUp', '=controller');
            app.emitEvent('mouseDown', '+controller');
            app.emitEvent('mouseUp', '-controller');
            app.emitEvent('mouseUp', '*controller');
            app.emitEvent('mouseUp', '/controller');

            currentOperation='+';
            firstTerm = textValue;
            cleanOnDigit = true;

            break;
        case '-':
            app.emitEvent('mouseUp', '=controller');
            app.emitEvent('mouseUp', '+controller');
            app.emitEvent('mouseDown', '-controller');
            app.emitEvent('mouseUp', '*controller');
            app.emitEvent('mouseUp', '/controller');

            currentOperation='-';
            firstTerm = textValue;
            cleanOnDigit = true;

            break;
        case '*':
            app.emitEvent('mouseUp', '=controller');
            app.emitEvent('mouseUp', '+controller');
            app.emitEvent('mouseUp', '-controller');
            app.emitEvent('mouseDown', '*controller');
            app.emitEvent('mouseUp', '/controller');

            currentOperation='*';
            firstTerm = textValue;
            cleanOnDigit = true;

            break;
        case '/':
            app.emitEvent('mouseUp', '=controller');
            app.emitEvent('mouseUp', '+controller');
            app.emitEvent('mouseUp', '-controller');
            app.emitEvent('mouseUp', '*controller');
            app.emitEvent('mouseDown', '/controller');

            currentOperation='/';
            firstTerm = textValue;
            cleanOnDigit = true;

            break;
        //editors
        case 'AC':
            resetDisplay();
            break;
        case '+-':
            if(textValue.charAt(0) === '-'){
                textValue = textValue.substring(1, textValue.length);
            } else{
                textValue = '-' + textValue;
            }
            updateDisplay();
            break;
        case '%':
            textValue = Number(textValue) / 100;
            updateDisplay();
            break;
    }

    if(textValue.charAt(0) === '0' && textValue !== '0'){
        textValue = textValue.substring(1, textValue.length);
        console.log(textValue);
    }
    updateDisplay();

});


function updateDisplay(){
    console.log(textValue);
    app.setVariable('textValue', textValue.substring(0, 9));
}

function resetDisplay(){
    textValue='00';
    firstTerm='';
    currentOperation='';
    app.emitEvent('mouseUp', '=controller');
    app.emitEvent('mouseUp', '+controller');
    app.emitEvent('mouseUp', '-controller');
    app.emitEvent('mouseUp', '*controller');
    app.emitEvent('mouseUp', '/controller');
}