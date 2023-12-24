const router=require('express').Router();
router.get('/',handleGetLoanTemplate);
function  handleGetLoanTemplate(req,res,next){
    try {
        console.log('hit')
        res.render('index')
    } catch (error) {
        next(error);
    }
}
module.exports=router;