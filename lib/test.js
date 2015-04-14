module.exports = test;

function test(fs) {
    var should = require('should');
    var when = require('when');
    var through = require('through2');
    
    before(function(done) {
        done();
    });

    after(function(done) {
        fs.delete('tmp', done);
    });

    describe('src/dest', function() {
        before(function(done) {
            fs.mkdir('tmp/src/test')
            .then(function() {
                return when.all([
                    fs.writeFile('tmp/src/a.js', 'a.js'),
                    fs.writeFile('tmp/src/b.js', 'b.js'),
                    fs.writeFile('tmp/src/c.js', 'c.js'),
                    fs.writeFile('tmp/src/d.css', 'd.css'),
                    fs.writeFile('tmp/src/test/e.js', 'e.js'),
                    fs.writeFile('tmp/src/test/f.png', 'f.png'),
                ]);
            })
            .done(function() {
                done();
            }, done);
        });

        it('should have stat', function(done) {
            fs.src('tmp/src/a.js')
            .pipe(through.obj(function(file, enc, cb) {
                should(file.stat).have.property('size', 4);
                should(file.stat.isFile()).be.true;
                done();
            }));
        });

        it('should src => dest ok', function(done) {
            var destFiles = [];
            fs.src('tmp/src/**/*.js')
            .pipe(fs.dest('tmp/dest'))
            .pipe(through.obj(function(file, enc, cb) {
                destFiles.push(file.relative);
                cb();
            }, function() {
                should(destFiles.sort()).eql(['a.js', 'b.js', 'c.js', 'test/e.js'].sort());
                done();
            }));
        });

        it('should src => dest ok', function(done) {
            var destFiles = [];
            fs.src('tmp/src/test/*.js')
            .pipe(fs.dest('tmp/dest'))
            .pipe(through.obj(function(file, enc, cb) {
                destFiles.push(file.relative);
                cb();
            }, function() {
                should(destFiles.sort()).eql(['e.js'].sort());
                done();
            }));
        })
    });
}