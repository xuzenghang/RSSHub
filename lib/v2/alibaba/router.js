module.exports = (router) => {
    router.get('/search/', require('./search'));
    router.get('/info/', require('./info'));
};
