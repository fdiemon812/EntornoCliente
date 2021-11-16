export class Operaciones{
    

   
    
    
    constructor(){}
    
    resta(numero1:number, numero2:number): number{
        
        
        return numero1-numero2;
        
    }
    
    suma(numero1:number, numero2:number): number{
        
        
        return numero1+numero2;
        
    
    }

    multiplicacion(numero1:number, numero2:number):number{

        let result:number=0;

        for (let i = 1; i <= numero1; i++) {
            
            result=result+numero2;
            
        }



        return result;

    }

}

