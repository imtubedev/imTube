module.exports = () => {
    return function* auth(next) {
        yield next;
        if (this.path === '/' || this.path === '/login') {
            return;
        }
        if (!this.ctx.session.user.username) {
            this.redirect('/', 'login.index');
        }

    
    };

    // module.exports = () => {
    //     return function* (next) {
    //       if (this.method === 'GET') return yield next;
    //       // do something
    //       yield next;
    //     }
    //   }
};
