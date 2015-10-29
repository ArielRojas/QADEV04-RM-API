describe('a suite of tests', function() {
  this.timeout(5000);

  it('should take less than 500ms', function(done){
    setTimeout(done, 3000);
  });

  it('should take less than 500ms as well', function(done){
    setTimeout(done, 2000);
  });
})