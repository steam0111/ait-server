// Проверка наличия текста
document.getElementById('checkText').onclick = function() {
    if ( this.checked ) {
  $("#textQuestion").css("opacity","1");
} else {
       $("#textQuestion").css("opacity","0");
    }
};

if (document.getElementById('checkText').value == "false") {
  $("#textQuestion").css("opacity","0");
}

// Проверка наличия свапа на стрелках
  document.getElementById('checkSwap').onclick = function() {
      if ( this.checked ) {
        $("#checkSwapFinger").css("opacity","1");
        $( "#checkSwapFinger" ).prop( "disabled", false );
        $("#checkSwapFingerText").css("opacity","1");
        $( "#checkSwapArrows" ).prop( "disabled", false );
        $("#checkSwapArrows").css("opacity","1");
        $("#checkSwapArrowsText").css("opacity","1");

        $('#checkSwapFinger').prop('checked', true);
        $('#checkSwapArrows').prop('checked', true);

        $("#imageBack").css("opacity","1");
        $("#imageNext").css("opacity","1");
        $("#styleImagesSwap").css("opacity","1");
        document.getElementById("styleImagesSwap").disabled = false;
        $(".styleImagesSwap").css("opacity","1");

      } else {
        $("#checkSwapFinger").css("opacity","0.5");
        $( "#checkSwapFinger" ).prop( "disabled", true );
        $("#checkSwapFinger").removeAttr("checked"); // снимает галочку

        $("#checkSwapArrows").css("opacity","0.5");
        $( "#checkSwapArrows" ).prop( "disabled", true );
        $("#checkSwapArrows").removeAttr("checked"); // снимает галочку

        $("#checkSwapFingerText").css("opacity","0.5");
        $("#checkSwapArrowsText").css("opacity","0.5");

        $("#imageBack").css("opacity","0");
        $("#imageNext").css("opacity","0");

        $("#styleImagesSwap").css("opacity","0.5");
       document.getElementById("styleImagesSwap").disabled = true;
       $(".styleImagesSwap").css("opacity","0.5");

      }
  };

  document.getElementById('checkSwapArrows').onclick = function() {
      if ( this.checked ) {
    $("#imageBack").css("opacity","1");
    $("#imageNext").css("opacity","1");
    $("#styleImagesSwap").css("opacity","1");
    document.getElementById("styleImagesSwap").disabled = false;
    $(".styleImagesSwap").css("opacity","1");
      } else {
         $("#imageBack").css("opacity","0");
         $("#imageNext").css("opacity","0");
         $("#styleImagesSwap").css("opacity","0.5");
         $(".styleImagesSwap").css("opacity","0.5");
        document.getElementById("styleImagesSwap").disabled = true;
      }
  };

  if (document.getElementById('checkSwapArrows').value == "false") {
    $("#imageBack").css("opacity","0");
    $("#imageNext").css("opacity","0");
  }

  // Проверка наличия прогресс-бара
  document.getElementById('checkProgressBar').onclick = function() {
      if ( this.checked ) {
    $("#progressBar").css("opacity","1");
      } else {
         $("#progressBar").css("opacity","0");
      }
  };

  if (document.getElementById('checkProgressBar').value == "false") {
    $("#progressBar").css("opacity","0");
  }



  // Отрисовка галочки от значения из БД
if (document.getElementById('checkText').value == "true") {
      $('#checkText').prop('checked', true);
    }
if (document.getElementById('checkSound').value == "true") {
    $('#checkSound').prop('checked', true);
  }
if (document.getElementById('checkSwap').value == "true") {
    $('#checkSwap').prop('checked', true);
  }
if (document.getElementById('checkSwapFinger').value == "true") {
    $('#checkSwapFinger').prop('checked', true);
  }
if (document.getElementById('checkSwapArrows').value == "true") {
    $('#checkSwapArrows').prop('checked', true);
  }
if (document.getElementById('checkProgressBar').value == "true") {
    $('#checkProgressBar').prop('checked', true);
  }
if (document.getElementById('checkBtnResult').value == "true") {
    $('#checkBtnResult').prop('checked', true);
  }
