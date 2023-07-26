import mysql from 'mysql'
export class StickyDB
{
    Connect()
    {
        const db = mysql.createConnection(
            {
                host:'localhost',
                user:'root',
                password:'',
                database:'sticky'
            });
        db.connect((err) => {
            if(err)
                console.error(err)
            else
            console.log('Connected')
        });
    }
}