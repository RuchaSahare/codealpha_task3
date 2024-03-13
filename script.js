const userData ={
    sMediaProfiles:{
        facebook:{
            followers:{
                qty:1987,
                growth:12
            },
            views:{
                qty:87,
                growth:0.03,
                viewTerm:"Page Views"
            },
            likes:{
                qty:57,
                growth:-0.02
            }
        },
        twitter:{
            followers:{
                qty:1044,
                growth:99
            },
            views:{
                qty:117,
                growth:3.03,
                viewTerm:"Retweets"
            },
            likes:{
                qty:507,
                growth:5.33
            }
        },
        instagram:{
            followers:{
                qty:11000,
                growth:1099
            },
            views:{
                qty:52000,
                growth:13.75,
                viewTerm:"Profile Views"
            },
            likes:{
                qty:5462,
                growth:22.57
            }
        },
        youtube:{
            followers:{
                qty:8239,
                growth:-144
            },
            views:{
                qty:1407,
                growth:-12,
                viewTerm:"Total Views"
            },
            likes:{
                qty:107,
                growth:-19
            }
        }
    },
    getTotalFollowers:function (){
        return this.sMediaProfiles.facebook.followers.qty
                +this.sMediaProfiles.twitter.followers.qty
                +this.sMediaProfiles.instagram.followers.qty
                +this.sMediaProfiles.youtube.followers.qty
            } ,
    tenThousandPlus:function(stat){
        return stat>9999? `${String(stat).substring(0, 2)}k`:stat;
    },

    growthIndicator:function(growthStat){
        return (growthStat>0)?"positive-growth":"negative-growth";
    },
    growthComponent:function(cardComponent,user,platform){
        const userProfileGrowth=[
    `           <figure class=${this.growthIndicator(user.sMediaProfiles[platform].views.growth)}></figure>`,
    `           <p>${user.sMediaProfiles[platform].views.growth*100}%</p>`,
    "           <p>Today</p>"
    ].join("\n")
    
    return userProfileGrowth 
    }
}

$themeSwitcher=$(".theme-switcher-container");
$themeBtn=$('.theme-switch-btn');
    $buildFollowerCard =function(user,platform){
        $followerGrowth = `${user.growthIndicator(user.sMediaProfiles[platform].followers.growth)}`;
        return $followerCard=$([
            "<div class=\"follower-card dark-theme\">",
            `     <div class=\"card-top-decoration ${platform}-decoration\"></div>`,
            "          <div class=\"platform-username\">",
            `           <span class=\"sm-icon ${platform}-icon\"></span>`,
            "            <a class=\"dark-theme\" href=\"http://\" target=\"_blank\" rel=\"noopener noreferrer\">@rucha_sahare</a>",
            "          </div>",
            "    <div class=\"follower-count\">",
            "       <figure>",
            `            <p class="follower-count">${user.tenThousandPlus(user.sMediaProfiles[platform].followers.qty)}</p>`,
            "            <p>Followers</p>",
            "       <figure>",
            "    </div>",
            "  <div class=\"daily-follower-stat\">",
            userData.growthComponent(this,userData,platform),
            "   </div>",
            " </div>",
            "</div>"
        ].join("\n"));
    }
$buildLikeViewCard=function(user,platform){
    return $likeViewCard=$([
"        <div class=\"daily-like-view-cards\">",
"        <div class=\"like-view dark-theme\">",
`          <p class="l-v">${user.sMediaProfiles[platform].views.viewTerm}</p>`,
`          <figure class=\"s-media-icon ${platform}-icon\"></figure>`,
`          <p class="l-v-qty">${user.sMediaProfiles[platform].views.qty}</p>`,
"          <div class=\"stat\">",

`            <figure class=\"${user.growthIndicator(user.sMediaProfiles[platform].views.growth*100)}\"></figure>`,
`            <p>${user.sMediaProfiles[platform].views.growth*100}%</p>`,
"          </div>",
"        </div>",

"        <div class=\"like-view dark-theme\">  ",
"          <p class=\"l-v\"> Likes</p>",
`          <figure class=\"s-media-icon ${platform}-icon\"></figure>`,
`          <p class=\"l-v-qty\">${user.sMediaProfiles[platform].likes.qty}</p>`,
"          <div class=\"stat\">",
`            <figure class=\"${user.growthIndicator(user.sMediaProfiles[platform].likes.growth*100)}\"></figure>`,
`            <p>${user.sMediaProfiles[platform].likes.growth*100}%</p>`,
"          </div>",
"        </div>",
"      </div>"
    ].join("\n")    )
    
}

function followerStatStyling(){
        $('.follower-stat-container').find(".daily-follower-stat ").find(".positive-growth ").parent().addClass("posiGrowthIndicator")
        $('.follower-stat-container').find(".daily-follower-stat ").find(".negative-growth ").parent().addClass("negaGrowthIndicator") 
        $('.stat').find(".positive-growth").next().addClass('posiGrowthIndicator')   
        $('.stat').find(".negative-growth").next().addClass('negaGrowthIndicator')   
    }  

let $themeStatus=$(".theme-switcher-container > p");
let defaultTheme = "Dark Mode";
$themeStatus.text(defaultTheme) 
function changeTheme(){
    $themeStatus.text();
    function assignDarkTheme(){
        $themeStatus.text("Dark Mode");
        $(".light-theme").addClass("dark-theme");
        $(".dark-theme").removeClass("light-theme");
        $themeBtn.animate({left:"5px"},"slow")
    }
    function assignLightTheme(){
        $themeStatus.text("Light Mode");
        $(".dark-theme").addClass("light-theme");
        $(".light-theme").removeClass("dark-theme");
        $themeBtn.animate({left:"30px"},"slow")
    }
    ($themeStatus.text()!=="Light Mode")?assignLightTheme():assignDarkTheme();
}

$(document).ready(function(){
    $themeStatus.text("Dark Mode");
    $('span.total-follower-qty').text(userData.getTotalFollowers());

    $(".theme-switcher-container").on("click",changeTheme);
        for(let profile in userData.sMediaProfiles){
            $('.follower-stat-container').append($buildFollowerCard(userData,profile))
            $('.daily-like-deck').append($buildLikeViewCard(userData,profile))
        }
        followerStatStyling()
    })



