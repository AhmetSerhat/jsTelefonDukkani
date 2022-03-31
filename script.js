//Ürün bilgileri dizi tipindeki değişkenlere alındı.
let redmiUrunleri=["REDMİ","450","POCO","1000","Mİ BAND","20"];
let samsungUrunleri=["A SERİSİ","5400","M SERİSİ","1500","S SERİSİ","2000"];
let appleUrunleri=["İpad","5000","Apple watch","1200","Airpors","3400"];

//Döngü için sayaç değişkeni
let i;

//Kategori seçimine göre doldurulacak ürünlerin input ve label tanımı için
let urunAciklama,urunSecenek;

//Sepete eklenecek ürünlerin ve ürünlere ait fiyatların ayrı ayrı taşınması için
let eklenecekler=[];
let fiyatlar=[];

//Sepete ekleme,çıkarma ve boşaltma için sepet nesnesinin seçimi
let listeSepet=document.getElementById("sepetMarket");

//Ödenecek toplam tutarı başta sıfırlayarak tanımladık.
let toplamTutar=0;

//İndirim kodu için bir dizi veya değişken tanımlanabilir.
const kod="SERHAT51";

//Kategori seçiminde ürünlerin güncellenmesi için olay yakalayıcı tanımlandı.
for(i=0;i<document.getElementsByName("kategori").length;i++)
{
    document.getElementsByName("kategori")[i].addEventListener("change",urunleriGetir);
}   

//Her kategori seçiminde gelecek ürünleri listeleyecek nesneler ve özellikleri tanımlandı
function olustur(){
    urunAciklama=document.createElement("label");
    urunSecenek=document.createElement("input");
    document.getElementById("urunPanel").appendChild(urunAciklama);
    document.getElementById("urunPanel").appendChild(urunSecenek);
    urunSecenek.type="checkbox";
    urunSecenek.setAttribute("name","urunler");
    urunAciklama.setAttribute("for","urunler");
    urunAciklama.setAttribute("class","urunler");
}

//Kategori seçimi yapıldıktan sonra ürün listesini(checkbox) doldurur.
function urunleriGetir(){
    //Ürün panelini her seferinde temizleyip yeniden doldurmak için 
    const silinecekler = document.getElementById("urunPanel");
    while (silinecekler.hasChildNodes()) {
      silinecekler.removeChild(silinecekler.firstChild);
    }

    //Her kategoriye ait ürün içeriklerini dizi üzerinden aldık.
    if(document.getElementById("kategoriRedmi").checked)
    {
        for(i=0;i<redmiUrunleri.length;i=i+2)
        {
            olustur();
            urunSecenek.value=redmiUrunleri[i+1];
            urunAciklama.innerHTML=redmiUrunleri[i]; 
        }
    }
    else if(document.getElementById("kategoriSamsung").checked)
    {
        for(i=0;i<samsungUrunleri.length;i=i+2)
        {
        olustur();
        urunSecenek.value=samsungUrunleri[i+1];
        urunAciklama.innerHTML=samsungUrunleri[i];
        }
    }
    else if(document.getElementById("kategoriApple").checked)
    {
        for(i=0;i<appleUrunleri.length;i=i+2)
        {
        olustur();
        urunSecenek.value=appleUrunleri[i+1];
        urunAciklama.innerHTML=appleUrunleri[i];
        }
    }
}

function sepeteEkle(){
    //Sepete eklenecek ürünleri alacağımız checkbox inputlar alındı.
    const listeUrunlerFiyat=document.getElementsByName("urunler");
    const listeUrunlerAd=document.getElementsByClassName("urunler");

    //Eklenecek ürün adedi seçimi
    let adet=document.getElementById("urunAdet").value;

    //Eklenecekler ve fiyatlar dizileri her ekleme sırasında sıfırlandı.
        eklenecekler=[];
        fiyatlar=[];

        //Checkbox inputlarının hepsi gezilerek seçili olanlar dizilere eklendi.
        for(i=0;i<listeUrunlerFiyat.length;i++){
            if(listeUrunlerFiyat[i].checked){
                //Eklenen adet kadar ürünün fiyatı hesaplandı.
                toplamTutar+=(Number(listeUrunlerFiyat[i].value)*adet);
                eklenecekler.push(listeUrunlerAd[i].innerHTML);
                fiyatlar.push(listeUrunlerFiyat[i].value);
            }
        }

        //Eklenecekleri ve fiyatlarını alabildik mi diye bir bakalım?
        console.log(eklenecekler);
        console.log(fiyatlar);


    //Eklenecek ürün adedi kadar aynı işlemi tekrar et
    for(i=0;i<adet;i++)
    {
        let sepeteeklenecekUrun;
        //Eklenecekler listesindeki herbir ürün için liste elemanlarını oluştur.
        for(let j=0;j<eklenecekler.length;j++){
            sepeteeklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteeklenecekUrun);
            //Her eklenen ürün için ad ve fiyat bilgilerini ilgili dizilerden çeker.
            sepeteeklenecekUrun.text=eklenecekler[j];
            sepeteeklenecekUrun.value=fiyatlar[j];
        }
        /*
        eklenecekler.forEach(element => {
            sepeteeklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteeklenecekUrun);
            sepeteeklenecekUrun.text=element;
            sepeteeklenecekUrun.value="Fiyat?";
        });
        */
    }

    //Ekleme işlemi yapılınca ara toplam tutarını yazdır.
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}

//Sepetten seçili ürünü indeks değerine bakarak siler.
function sepettenCikar(){
    //Seçili elemanın indeks sırasını ve valuesini alarak toplam tutardan düştük ve sildik.
    let seciliIndeks=listeSepet.selectedIndex;
    let silinecekUrununFiyati=listeSepet.options[seciliIndeks].value;
    listeSepet.options.remove(seciliIndeks);
    //Silinen ürünün fiyatını toplam fiyattan düşürür.
    toplamTutar=toplamTutar-silinecekUrununFiyati;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}

//Tüm ürünleri sözel döngü fonksiyonuyla gezerek
function sepetiBosalt(){
    document.querySelectorAll('#sepetMarket option').forEach(eleman => eleman.remove());
    toplamTutar=0;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";

}

//İndirim kodunu kontrol ederek indirim uygulama
function koduEkle(){
    let girilenKod=document.getElementById("txtIndirim").value;
    if(girilenKod == kod)
    {
        if(toplamTutar>=50)
        {
            toplamTutar=toplamTutar-300;
            
            document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
            document.getElementById("sonuc").innerHTML="İndirim uygulandı.";
            document.getElementById("txtIndirim").disabled=true;
            document.getElementById("btnCikar").disabled=true;
            document.getElementById("txtIndirim").value="";
        }
        else{
            document.getElementById("sonuc").innerHTML="Girdiğiniz kod için minimum sepet tutarı 50 TL olmalıdır!";
        }
    }
    else{
        document.getElementById("sonuc").innerHTML="Geçerli bir kod girmediniz!";
    }
}
