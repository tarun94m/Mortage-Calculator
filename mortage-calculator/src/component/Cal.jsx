import { useState } from "react";

const Calculator=()=>{

    const [monthlyMortage, setMonthlyMortage]=useState('');

    const calculateMortage= (p, r, n)=>{
        p=parseFloat(p);
        r=parseFloat(r)/100/12;
        n=parseFloat(n)*12;
        return p*((r*Math.pow(1+r,n))/(Math.pow(1+r, n)-1));
    }

    const currencyFormatter=new Intl.NumberFormat(
        'en-US',
        {
            style: 'currency',
            currency: 'USD'
        }
    )

    const  onSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target);
        let p=data.get('principle');
        let r=data.get('interest-rate');
        let n=data.get('duration');
        let mortage=calculateMortage(p, r, n);

        setMonthlyMortage(currencyFormatter.format(mortage));
    }

    return(
        <div>
            <form className="form-container" onSubmit={onSubmit}>
                <div className="principle-wrapper">
                    <label htmlFor="">Principle Amount: {''}
                    <input type="number"  name="principle"/>
                    </label>
                </div>

                <div className="interest-wrapper">
                    <label htmlFor="">Interest Rate: {''}
                    <input type="number" name="interest-rate"/>
                    </label>
                </div>

                <div className="duration-wrapper">
                    <label htmlFor="">Length of Loan: {''}
                    <input type="number" name="duration" />
                    <span> Years</span>
                    </label>
                </div>
                
                <div className="btn-calculate">
                <button type="submit">Calculate</button>
                </div>

                <div>
                    {monthlyMortage && 
                    <p>Your monthly mortage payment will be {monthlyMortage}</p>}
                </div>
                
            </form>
        </div>
    )
}

export default Calculator;