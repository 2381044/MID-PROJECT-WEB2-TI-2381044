


#include <iostream>
using namespace std;

int cariNIM(){
    int nim;
    cout << "\nMasukkan NIM yang ingin dicari: ";
    cin >> nim;
    return nim;
}

void tukar (int * ta, int * tb){
    int temp = *ta;
    *ta = *tb;
    *tb = temp;
}

void bubbleSort (int NIM[], int panjang){
    for (int i = 0; i < panjang-1; i++){
        for (int j = 0; j < panjang-i-1; j++){
            if (NIM[j] > NIM[j+1])
                tukar (&NIM[j], &NIM[j+1]);
        }
    }
}

int binarySearch (int arr[], int cari, int bawah, int atas){
    while (bawah <= atas){
        int mid = bawah + (atas-bawah) / 2;
        if (arr[mid] == cari)
         return mid;
        if (arr[mid] < cari){
        bawah = mid + 1;
        }else{
            atas = mid - 1;
        }
    }
    return -1;
}

int binarySearchrekursif (int ARR[], int CARI, int BAWAH, int ATAS){
if (ATAS >= BAWAH){
    int MID = BAWAH + (ATAS-BAWAH) / 2;
    if (ARR[MID] == CARI)
        return MID;
    if (ARR[MID] > CARI)
        return binarySearchrekursif(ARR, CARI, BAWAH, MID - 1);
    return binarySearchrekursif(ARR, CARI, MID + 1, ATAS);
    }
    return -1;
}

int main(){
    int NIM[10];
    int n;
    cout << "Aplikasi ini dibuat oleh Ramos Otniel Lumban Gaol"<<endl;
    cout << "Masukkan panjang array: ";
    cin >> n;
    for (int i = 0; i < n; i++){
        cout << "Masukkan NIM ke-" << i+1 << ": ";
        cin >> NIM[i];
    }
    bubbleSort (NIM, n);
    cout << "Hasil dari array setelah diurutkan:"<<endl;
    for (int i = 0; i < n; i++){
        cout << NIM[i] <<   " ";
    }
    system ("cls");
    int x = cariNIM();
    cout << "\nHasil pencarian menggunakan binary search: ";
    int hasil = binarySearch(NIM, x, 0, n-1);
    (hasil == -1)
        ? cout << "\nMaaf NIM tidak ditemukan"
        : cout << "\nNIM berada pada indeks ke-" << hasil;
    
    cout << "\nHasil pencarian menggunakan binary search rekursif: ";
    int hasil2 = binarySearchrekursif(NIM, x, 0, n-1);
    (hasil2 == -1)
        ? cout << "\nMaaf NIM tidak ditemukan"
        : cout << "\nNIM berada pada indeks ke-" << hasil2;
    return 0;
}