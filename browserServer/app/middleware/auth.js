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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7SUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUk7UUFDdEIsTUFBTSxJQUFJLENBQUM7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUdMLENBQUMsQ0FBQztJQUVGLDJCQUEyQjtJQUMzQixnQ0FBZ0M7SUFDaEMsc0RBQXNEO0lBQ3RELHdCQUF3QjtJQUN4QixvQkFBb0I7SUFDcEIsUUFBUTtJQUNSLE1BQU07QUFDVixDQUFDLENBQUMifQ==