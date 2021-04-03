$(function () {
  //сортування по назві=========
  $("#sortTopTitle").click(function () {
    $(".sort .top").css("color", "#3f3f3f");
    $(".sort .bottom").css("color", "#3f3f3f");
    $("#sortTopTitle .top").css("color", "#000000");

    let $tbody = $("#tbody"),
      postTemplate = $("#order-template").html(),
      arT = new Array(),
      arD = new Array(),
      arS = new Array(),
      arVid = new Array(),
      arView = new Array(),
      newar = new Array(),
      title = $(".title");

    for (let i = 0; i < title.length; i++) {
      arT.push($(".title").eq(i).text());
      arD.push($(".date").eq(i).text());
      arS.push($(".subscriber").eq(i).text());
      arVid.push($(".video").eq(i).text());
      arView.push($(".view").eq(i).text());
    }

    for (let i = 0; i < arT.length; i++) {
      newar.push(arT[i]);
    }
    newar.sort();

    $tbody.html("");

    for (let i = 0; i < newar.length; i++) {
      for (let j = 0; j < arT.length; j++) {
        if (newar[i] == arT[j]) {
          let post = {
            title: arT[j],
            date: arD[j],
            subscriber: arS[j],
            video: arVid[j],
            view: arView[j],
          };

          $tbody.prepend(Mustache.render(postTemplate, post));
        }
      }
    }
  });

  $("#sortBottomTitle").click(function () {
    $(".sort .top").css("color", "#3f3f3f");
    $(".sort .bottom").css("color", "#3f3f3f");
    $("#sortBottomTitle .bottom").css("color", "#000000");

    let $tbody = $("#tbody"),
      postTemplate = $("#order-template").html(),
      arT = new Array(),
      arD = new Array(),
      arS = new Array(),
      arVid = new Array(),
      arView = new Array(),
      newar = new Array(),
      title = $(".title");

    for (let i = 0; i < title.length; i++) {
      arT.push($(".title").eq(i).text());
      arD.push($(".date").eq(i).text());
      arS.push($(".subscriber").eq(i).text());
      arVid.push($(".video").eq(i).text());
      arView.push($(".view").eq(i).text());
    }

    for (let i = 0; i < arT.length; i++) {
      newar.push(arT[i]);
    }
    newar.sort();

    $tbody.html("");

    for (let i = 0; i < newar.length; i++) {
      for (let j = 0; j < arT.length; j++) {
        if (newar[i] == arT[j]) {
          let post = {
            title: arT[j],
            date: arD[j],
            subscriber: arS[j],
            video: arVid[j],
            view: arView[j],
          };

          $tbody.append(Mustache.render(postTemplate, post));
        }
      }
    }
  });

  //сортування по підписниках==========
  $("#sortTopSub").click(function () {
    $(".sort .top").css("color", "#3f3f3f");
    $(".sort .bottom").css("color", "#3f3f3f");
    $("#sortTopSub .top").css("color", "#000000");
    let $tbody = $("#tbody"),
      postTemplate = $("#order-template").html(),
      arT = new Array(),
      arD = new Array(),
      arS = new Array(),
      arVid = new Array(),
      arView = new Array(),
      newar = new Array(),
      subscriber = $(".subscriber"),
      arS2 = new Array();

    for (let i = 0; i < subscriber.length; i++) {
      arT.push($(".title").eq(i).text());
      arD.push($(".date").eq(i).text());
      arS.push($(".subscriber").eq(i).text());
      arVid.push($(".video").eq(i).text());
      arView.push($(".view").eq(i).text());
    }

    for (let i = 0; i < arS.length; i++) {
      arS2.push(arS[i]);
    }

    let x;
    for (let i = 1; i <= arS2.length; i++) {
      if (arS2.length == 1) {
        newar.push(arS2[0]);
        console.log(newar);
        arS2.splice(0, 1);
        console.log(arS2);
      } else {
        let num = arS2[i];
        for (let j = 0; j < arS2.length; j++) {
          if (num < arS2[j]) {
            num = arS2[j];
            x = j;
          }
        }
        newar.push(num);
        console.log(newar);
        arS2.splice(x, 1);
        console.log(arS2);

        i--;
      }
    }

    $tbody.html("");

    for (let i = 0; i < newar.length; i++) {
      for (let j = 0; j < arS.length; j++) {
        if (newar[i] == arS[j]) {
          let post = {
            title: arT[j],
            date: arD[j],
            subscriber: arS[j],
            video: arVid[j],
            view: arView[j],
          };

          $tbody.prepend(Mustache.render(postTemplate, post));
        }
      }
    }
  });

  $("#sortBottomSub").click(function () {
    $(".sort .top").css("color", "#3f3f3f");
    $(".sort .bottom").css("color", "#3f3f3f");
    $("#sortBottomSub .bottom").css("color", "#000000");
    let $tbody = $("#tbody"),
      postTemplate = $("#order-template").html(),
      arT = new Array(),
      arD = new Array(),
      arS = new Array(),
      arVid = new Array(),
      arView = new Array(),
      newar = new Array(),
      subscriber = $(".subscriber"),
      arS2 = new Array();

    for (let i = 0; i < subscriber.length; i++) {
      arT.push($(".title").eq(i).text());
      arD.push($(".date").eq(i).text());
      arS.push($(".subscriber").eq(i).text());
      arVid.push($(".video").eq(i).text());
      arView.push($(".view").eq(i).text());
    }

    for (let i = 0; i < arS.length; i++) {
      arS2.push(arS[i]);
    }

    let x;
    for (let i = 1; i <= arS2.length; i++) {
      if (arS2.length == 1) {
        newar.push(arS2[0]);
        console.log(newar);
        arS2.splice(0, 1);
        console.log(arS2);
      } else {
        let num = arS2[i];
        for (let j = 0; j < arS2.length; j++) {
          if (num < arS2[j]) {
            num = arS2[j];
            x = j;
          }
        }
        newar.push(num);
        console.log(newar);
        arS2.splice(x, 1);
        console.log(arS2);

        i--;
      }
    }

    $tbody.html("");

    for (let i = 0; i < newar.length; i++) {
      for (let j = 0; j < arS.length; j++) {
        if (newar[i] == arS[j]) {
          let post = {
            title: arT[j],
            date: arD[j],
            subscriber: arS[j],
            video: arVid[j],
            view: arView[j],
          };

          $tbody.append(Mustache.render(postTemplate, post));
        }
      }
    }
  });

  //сортування по відео=========
  $("#sortTopVid").click(function () {
    $(".sort .top").css("color", "#3f3f3f");
    $(".sort .bottom").css("color", "#3f3f3f");
    $("#sortTopVid .top").css("color", "#000000");
    let $tbody = $("#tbody"),
      postTemplate = $("#order-template").html(),
      arT = new Array(),
      arD = new Array(),
      arS = new Array(),
      arVid = new Array(),
      arView = new Array(),
      newar = new Array(),
      subscriber = $(".subscriber"),
      arVid2 = new Array();

    for (let i = 0; i < subscriber.length; i++) {
      arT.push($(".title").eq(i).text());
      arD.push($(".date").eq(i).text());
      arS.push($(".subscriber").eq(i).text());
      arVid.push($(".video").eq(i).text());
      arView.push($(".view").eq(i).text());
    }

    for (let i = 0; i < arVid.length; i++) {
      arVid2.push(arVid[i]);
    }

    let x;
    for (let i = 1; i <= arVid2.length; i++) {
      if (arVid2.length == 1) {
        newar.push(arVid2[0]);
        console.log(newar);
        arVid2.splice(0, 1);
        console.log(arVid2);
      } else {
        let num = arVid2[i];
        for (let j = 0; j < arVid2.length; j++) {
          if (num < arVid2[j]) {
            num = arVid2[j];
            x = j;
          }
        }
        newar.push(num);
        console.log(newar);
        arVid2.splice(x, 1);
        console.log(arVid2);

        i--;
      }
    }

    $tbody.html("");

    for (let i = 0; i < newar.length; i++) {
      for (let j = 0; j < arVid.length; j++) {
        if (newar[i] == arVid[j]) {
          let post = {
            title: arT[j],
            date: arD[j],
            subscriber: arS[j],
            video: arVid[j],
            view: arView[j],
          };

          $tbody.prepend(Mustache.render(postTemplate, post));
        }
      }
    }
  });

  $("#sortBottomVid").click(function () {
    $(".sort .top").css("color", "#3f3f3f");
    $(".sort .bottom").css("color", "#3f3f3f");
    $("#sortBottomVid .bottom").css("color", "#000000");
    let $tbody = $("#tbody"),
      postTemplate = $("#order-template").html(),
      arT = new Array(),
      arD = new Array(),
      arS = new Array(),
      arVid = new Array(),
      arView = new Array(),
      newar = new Array(),
      subscriber = $(".subscriber"),
      arView2 = new Array();

    for (let i = 0; i < subscriber.length; i++) {
      arT.push($(".title").eq(i).text());
      arD.push($(".date").eq(i).text());
      arS.push($(".subscriber").eq(i).text());
      arVid.push($(".video").eq(i).text());
      arView.push($(".view").eq(i).text());
    }

    for (let i = 0; i < arVid.length; i++) {
      arVid2.push(arVid[i]);
    }

    let x;
    for (let i = 1; i <= arVid2.length; i++) {
      if (arVid2.length == 1) {
        newar.push(arVid2[0]);
        console.log(newar);
        arVid2.splice(0, 1);
        console.log(arVid2);
      } else {
        let num = arVid2[i];
        for (let j = 0; j < arVid2.length; j++) {
          if (num < arVid2[j]) {
            num = arVid2[j];
            x = j;
          }
        }
        newar.push(num);
        console.log(newar);
        arVid2.splice(x, 1);
        console.log(arVid2);

        i--;
      }
    }

    $tbody.html("");

    for (let i = 0; i < newar.length; i++) {
      for (let j = 0; j < arVid.length; j++) {
        if (newar[i] == arVid[j]) {
          let post = {
            title: arT[j],
            date: arD[j],
            subscriber: arS[j],
            video: arVid[j],
            view: arView[j],
          };

          $tbody.append(Mustache.render(postTemplate, post));
        }
      }
    }
  });

  //сортування по переглядах==========
  $("#sortTopView").click(function () {
    $(".sort .top").css("color", "#3f3f3f");
    $(".sort .bottom").css("color", "#3f3f3f");
    $("#sortTopView .top").css("color", "#000000");
    let $tbody = $("#tbody"),
      postTemplate = $("#order-template").html(),
      arT = new Array(),
      arD = new Array(),
      arS = new Array(),
      arVid = new Array(),
      arView = new Array(),
      newar = new Array(),
      subscriber = $(".subscriber"),
      arView2 = new Array();

    for (let i = 0; i < subscriber.length; i++) {
      arT.push($(".title").eq(i).text());
      arD.push($(".date").eq(i).text());
      arS.push($(".subscriber").eq(i).text());
      arVid.push($(".video").eq(i).text());
      arView.push($(".view").eq(i).text());
    }

    for (let i = 0; i < arView.length; i++) {
      arView2.push(arView[i]);
    }

    let x;
    for (let i = 1; i <= arView2.length; i++) {
      if (arView2.length == 1) {
        newar.push(arView2[0]);
        console.log(newar);
        arView2.splice(0, 1);
        console.log(arView2);
      } else {
        let num = arView2[i];
        for (let j = 0; j < arView2.length; j++) {
          if (num < arView2[j]) {
            num = arView2[j];
            x = j;
          }
        }
        newar.push(num);
        console.log(newar);
        arView2.splice(x, 1);
        console.log(arView2);

        i--;
      }
    }

    $tbody.html("");

    for (let i = 0; i < newar.length; i++) {
      for (let j = 0; j < arView.length; j++) {
        if (newar[i] == arView[j]) {
          let post = {
            title: arT[j],
            date: arD[j],
            subscriber: arS[j],
            video: arVid[j],
            view: arView[j],
          };

          $tbody.prepend(Mustache.render(postTemplate, post));
        }
      }
    }
  });

  $("#sortBottomView").click(function () {
    $(".sort .top").css("color", "#3f3f3f");
    $(".sort .bottom").css("color", "#3f3f3f");
    $("#sortBottomView .bottom").css("color", "#000000");
    let $tbody = $("#tbody"),
      postTemplate = $("#order-template").html(),
      arT = new Array(),
      arD = new Array(),
      arS = new Array(),
      arVid = new Array(),
      arView = new Array(),
      newar = new Array(),
      subscriber = $(".subscriber"),
      arView2 = new Array();

    for (let i = 0; i < subscriber.length; i++) {
      arT.push($(".title").eq(i).text());
      arD.push($(".date").eq(i).text());
      arS.push($(".subscriber").eq(i).text());
      arVid.push($(".video").eq(i).text());
      arView.push($(".view").eq(i).text());
    }

    for (let i = 0; i < arView.length; i++) {
      arView2.push(arView[i]);
    }

    let x;
    for (let i = 1; i <= arView2.length; i++) {
      if (arView2.length == 1) {
        newar.push(arView2[0]);
        console.log(newar);
        arView2.splice(0, 1);
        console.log(arView2);
      } else {
        let num = arView2[i];
        for (let j = 0; j < arView2.length; j++) {
          if (num < arView2[j]) {
            num = arView2[j];
            x = j;
          }
        }
        newar.push(num);
        console.log(newar);
        arView2.splice(x, 1);
        console.log(arView2);

        i--;
      }
    }

    $tbody.html("");

    for (let i = 0; i < newar.length; i++) {
      for (let j = 0; j < arView.length; j++) {
        if (newar[i] == arView[j]) {
          let post = {
            title: arT[j],
            date: arD[j],
            subscriber: arS[j],
            video: arVid[j],
            view: arView[j],
          };

          $tbody.append(Mustache.render(postTemplate, post));
        }
      }
    }
  });
});
