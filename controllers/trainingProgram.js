exports.getTraining = (req,res) =>{
    res.render('training',
    {
        webTitle: 'Training page'
    });
}

exports.getAbsTraining = (req, res) =>{
    res.render('absTraining',
    {
        webTitle: 'abs training'
    });
}

exports.getLegsTraining = (req, res) =>{
    res.render('legsTraining',
    {
        webTitle:'legs training'
    });
}

exports.getShouldersTraining = (req, res) =>{
    res.render('shouldersTraining',
    {
        webTitle:'shoulders training'
    });
}

exports.getChestTraining = (req, res) =>{
    res.render('chestTraining',
    {
        webTitle: 'chest training'
    });
}

exports.getBackTraining = (req, res) =>{
    res.render('backTraining', {
        webTitle: 'back training'
    });
}

exports.getArmTraining = (req, res) =>{
    res.render('armTraining', {
        webTitle:'arm training'
    });
}