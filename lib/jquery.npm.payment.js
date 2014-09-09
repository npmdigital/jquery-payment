(function() {

  var $ = jQuery;
  $.npm = $.npm || {};
  $.npm.payment = $.extend($.payment,{
    debug: function(s) {
      if (typeof console == "undefined") {
        this.console = {log: function() {}};
      }
      console.log(s);
    },
    formatAmount: function(value) {
      this.debug('-- npm.payment.formatAmount('+value+')');
      var strValue = value.replace(/[^\d\.]/g, "") // all non-digits & non-spaces
                          .replace(/\./,"X") // first decimal
                          .replace(/\./g,"") // nuke any other decimals
                          .replace(/X/,"."); // replace the first decimal
      return parseFloat(strValue)
        .toFixed(2)
        .toString();
        //.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    parseAmount: function(strValue) {
      this.debug('-- npm.payment.parseAmount("'+strValue+'"")');
      return parseFloat(strValue.replace(/,/g, ""))
        .toFixed(2);
    },
    validateAmount: function(strValue) {
      var val = this.parseAmount(strValue);
      this.debug('-- npm.payment.validateAmount('+ val +' :: NaN?' + (isNaN(val)?'Yep':'Nope') + ')' );
      return !isNaN( val );
    },
    displayAmount: function(value) {
      if (typeof value == 'string') {
        var strValue = value.replace(/[^\d\.]/g, "") // all non-digits & non-spaces
                          .replace(/\./,"X") // first decimal
                          .replace(/\./g,"") // nuke any other decimals
                          .replace(/X/,"."); // replace the first decimal
        value = parseFloat(strValue);
      }
      return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    restrictAmount: function(e) {
      var input;
      if (e.metaKey || e.ctrlKey) {
        return true;
      }
      if (e.which === 32) {
        return false;
      }
      if (e.which === 0) {
        return true;
      }
      if (e.which < 33) {
        return true;
      }
      input = String.fromCharCode(e.which);
      return !!/[\d\s\.]/.test(input);
    },
  });

  $.npm.payment.fn.amount = function() {
    //$(this).attr({pattern:'^\d+(?:,\d{3})*(.\\d{2}$)?',formnovalidate:'formnovalidate',inputmode:'numeric'});
    this.payment('restrictAmount');
    $(this).attr({inputmode:'numeric'});
    $("head").append( $("<style>").text("input::-webkit-outer-spin-button,input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }") );
    this.on('blur',function(event) {
      var value = $.npm.payment.formatAmount(this.value);
      $(this).val(value);
    });
  };

  $.npm.payment.fn.restrictAmount = function(e) {
    this.on('keypress',$.npm.payment.restrictAmount);
    return this;
  };


}).call(this);