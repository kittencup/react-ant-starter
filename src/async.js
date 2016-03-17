class Async {

    static getComponent(path) {
        return (location, cb)=> {
            require.ensure([], (require)=> {
                var component = require(path);
                cb(null, component.default)
            });
        }
    }
}

export default Async;