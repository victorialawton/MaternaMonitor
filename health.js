let age = $("#age").val();
// Get the modal
var modal = document.getElementById("myModal");

let alc = {
    name: "Alcohol Use",
    description: "Drinking alcohol during pregnancy can increase the baby\'s risk for fetal alcohol spectrum disorders (FASDs), sudden infant death syndrome, and other problems. FASDs are a variety of effects on the fetus that result from the mother\'s drinking alcohol during pregnancy. The effects range from mild to severe, and they include intellectual and developmental disabilities; behavior problems; abnormal facial features; and disorders of the heart, kidneys, bones, and hearing. FASDs are completely preventable: If a woman does not drink alcohol while she is pregnant, her child will not have an FASD. Women who drink also are more likely to have a miscarriage or stillbirth. Currently, research shows that there is no safe amount of alcohol to drink while pregnant. According to one study supported by NIH, infants can suffer long-term developmental problems even with low levels of prenatal alcohol exposure."
}
let tobacco = {
    name: "Tobacco Use",
    description: "Tobacco use. Smoking during pregnancy puts the fetus at risk for preterm birth, certain birth defects, and sudden infant death syndrome (SIDS). One study showed that smoking doubled or even tripled the risk of stillbirth, or fetal death after 20 weeks of pregnancy.20 Research has also found that smoking during pregnancy leads to changes in an infant’s immune system.21 Secondhand smoke also puts a woman and her developing fetus at increased risk for health problems."
}
let drug ={
    name: "Drug Use",
    description: "Tobacco use. Smoking during pregnancy puts the fetus at risk for preterm birth, certain birth defects, and sudden infant death syndrome (SIDS). One study showed that smoking doubled or even tripled the risk of stillbirth, or fetal death after 20 weeks of pregnancy.20 Research has also found that smoking during pregnancy leads to changes in an infant’s immune system.21 Secondhand smoke also puts a woman and her developing fetus at increased risk for health problems."
}
let bp = {
    name: "High Blood Pressure",
    description: "Even though high blood pressure can be risky for the mother and fetus, most women with slightly high blood pressure and no other diseases have healthy pregnancies and healthy deliveries because they get their blood pressure under control before pregnancy. Uncontrolled high blood pressure, however, can damage the mother’s kidneys and increase the risk for low birth weight or preeclampsia.1 It is very important for women to have their blood pressure checked at every prenatal visit so that healthcare providers can detect any changes and make decisions about treatment."
}
let pcos = {
    name: "PCOS",
    description: "Women with polycystic ovary syndrome (PCOS) have higher rates of pregnancy loss before 20 weeks of pregnancy, diabetes during pregnancy (gestational diabetes), preeclampsia, and cesarean section."
}
let diabetes = {
    name: "Diabetes",
    description: "It is important for women with diabetes to manage their blood sugar levels both before getting pregnant and throughout pregnancy. During the first few weeks of pregnancy, often before a woman even knows she is pregnant, high blood sugar levels can cause birth defects. Even women whose diabetes is well under control may have changes in their metabolism during pregnancy that require extra care or treatment to promote a healthy birth.3 Babies of mothers with diabetes tend to be large and are likely to have low blood sugar soon after birth. That is another reason for women with diabetes to keep tight control of their blood sugar."
}
let kidney = {
    name: "Kidney Disease",
    description: "Women with mild kidney disease often have healthy pregnancies. But kidney disease can cause difficulties getting and staying pregnant as well as problems during pregnancy, including preterm delivery, low birth weight, and preeclampsia. Nearly one-fifth of women who develop preeclampsia early in pregnancy are found to have undiagnosed kidney disease.4 Pregnant women with kidney disease require additional treatments, changes in diet and medication, and frequent visits to their healthcare provider."
}
let twins = {
    name: "Multiple Gestation",
    description: "Pregnancy with twins, triplets, or more fetuses, called multiple gestation, increases the risk of infants being born prematurely (before 37 weeks of pregnancy). Both giving birth after age 30 and taking fertility drugs have been linked with multiple births. Having three or more infants increases the chance that a woman will need to have the infants delivered by cesarean section. Twins and triplets are more likely to be smaller for their size than single infants. If infants are born prematurely, they are more likely to have difficulty breathing."
}
let eclamp = {
    name: "(Pre)Eclampsia",
    description: "Preeclampsia is a sudden increase in a pregnant woman’s blood pressure after the 20th week of pregnancy. It can affect the mother’s kidneys, liver, and brain. The condition can be fatal for both the mother and the fetus or cause long-term health problems. Eclampsia is a more severe form of preeclampsia that includes seizures and possibly coma."
}
let preterm = {
    name: "Previous Preterm Birth",
    description: "Women who went into labor or who had their baby early (before 37 weeks of pregnancy) with a previous pregnancy are at higher risk for preterm labor and birth with their current pregnancy. Healthcare providers will want to monitor women at high risk for preterm labor and birth in case treatment is needed. NICHD research has shown that, among women at high risk for preterm labor and birth because of a previous preterm birth, giving progesterone can help delay birth.25 In addition, women who become pregnant within 12 months after their latest delivery may be at increased risk for preterm birth.26 Women who have recently given birth may want to talk with a healthcare provider about contraception to help delay the next pregnancy."
}
let oldAge = {
    name: "Pregnancy after Age 35",
    description: "Most older first-time mothers have normal pregnancies, but research shows that older women are at higher risk for certain problems than younger women,14 including: pregnancy-related high blood pressure (called gestational hypertension) and diabetes (called gestational diabetes, pregnancy loss, ectopic pregnancy (when the embryo attaches itself outside the uterus), a condition that can be life-threatening, Cesarean (surgical) delivery, delivery complications, such as excessive bleeding, prolonged labor (lasting more than 20 hours), labor that does not advance,  and genetic disorders, such as Down syndrome, in the baby"
}
let youngAge = {
    name: "Young Age",
    description: "Pregnant teens are more likely to develop pregnancy-related high blood pressure and anemia (lack of healthy red blood cells) and to go through preterm (early) labor and delivery than women who are older. Teens are also more likely to not know they have a sexually transmitted infection (STI). Some STIs can cause problems with the pregnancy or for the baby.12 Teens may be less likely to get prenatal care or to keep prenatal appointments. Prenatal care is important because it allows a healthcare provider to evaluate, identify, and treat risks, such as counseling teens not to take certain medications during pregnancy, sometimes before these risks become problems."
}

let possibleRisks = [alc, tobacco, drug, bp, pcos, diabetes, kidney, twins, eclamp, preterm, youngAge, oldAge];

$(".condition-btn").on("click", function () {
    console.log("click");
    if (this.classList.contains("selected")) {
        $(this).css("backgroundColor", "#0d6efd");
        $(this).css("color", "white");
    }
    else {
        $(this).css("backgroundColor", "#BFD7EA");
        $(this).css("color", "black");
    }

    $(this).toggleClass("selected");
    item = $(this);
})

$(".submit").on("click", function () {
    let selectedButtons = $(".selected");

    console.log(selectedButtons);
    let selectedContent = [];
    let selectedObjects = [];
    let age = $("#age").val();
    if(age < 20){
        selectedObjects.push(possibleRisks[10]);
    }
    if(age >= 35){
        selectedObjects.push(possibleRisks[11]);
    }
    for (let i = 0; i < selectedButtons.length; i++) {
        selectedContent.push(selectedButtons[i].innerHTML);
        let result = possibleRisks.find(obj =>{
            return obj.name === selectedButtons[i].innerHTML
        })
        // console.log(result);
        selectedObjects.push(result);
    }
    let selectedString = JSON.stringify(selectedContent);
    if (!age) {
        $("#error").css("display", "block");
    }
    else {
        $("#error").css("display", "none");
        localStorage.setItem("age", age);
        localStorage.setItem("risks", selectedContent);
        $(".modal-body").empty();
        modal.style.display = "block";

        // console.log(possibleRisks);
        for(let i = 0; i<selectedObjects.length; i++){
            $(".modal-body").append(`<h3>${selectedObjects[i].name}</h3>
            <p>${selectedObjects[i].description}</p>`)
        }
        if(selectedObjects.length == 0){
            $(".modal-body").append(`<h3>${"None!"}</h3>
            <p>${"You have no apparent risk factors in your pregnancy."}</p>`)
        }
        
    }


    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});




