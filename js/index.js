// Objek untuk menyimpan kategori BMI dan pesan terkaitnya
const BMI_CATEGORIES = {
  UNDERWEIGHT: 'Kekurangan berat badan',
  NORMAL: 'Normal (ideal)',
  OVERWEIGHT: 'Kelebihan berat badan',
  OBESITY: 'Kegemukan (Obesitas)',
};

// Fungsi untuk menghitung BMI berdasarkan berat badan dan tinggi badan
const calculateBMI = (weight, height) => {
  let bmi = weight / ((height / 100) ** 2);

  return bmi.toFixed(1);
};

// Fungsi untuk memvalidasi input berat badan, tinggi badan, usia, dan jenis kelamin
const validateInput = (weight, height, age, gender) => {
  // Mengambil elemen error message untuk masing-masing input
  const genderErrorMessage = document.getElementById('genderErrorMessage');
  const weightErrorMessage = document.getElementById('weightErrorMessage');
  const ageErrorMessage = document.getElementById('ageErrorMessage');
  const heightErrorMessage = document.getElementById('heightErrorMessage');

  // Mengatur pesan error menjadi kosong untuk mereset pesan error sebelumnya
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((element) => (element.innerText = ''));

  let isValid = true;

  // Validasi jenis kelamin
  if (gender === '' || !['Pria', 'Wanita'].includes(gender)) {
    genderErrorMessage.innerText = 'Pilih jenis kelamin terlebih dahulu';
    isValid = false;
  }

  // Validasi berat badan
  if (isNaN(weight) || weight <= 0) {
    weightErrorMessage.innerText = 'Berat badan harus berupa angka lebih dari 0';
    isValid = false;
  }

  // Validasi tinggi badan
  if (isNaN(height) || height <= 0) {
    heightErrorMessage.innerText = 'Tinggi badan harus berupa angka lebih dari 0';
    isValid = false;
  }

  // Validasi usia
  if (isNaN(age) || age <= 0) {
    ageErrorMessage.innerText = 'Umur harus berupa angka lebih dari 0';
    isValid = false;
  }

  return isValid;
};

// Fungsi untuk mengecek status BMI berdasarkan nilai BMI dan jenis kelamin
const checkStatus = (bmi, gender) => {
  let status = '';

  // Menentukan status BMI berdasarkan kategori dan nilai BMI
  switch (gender) {
    case 'Pria':
      if (bmi < 18.5) {
        status = BMI_CATEGORIES.UNDERWEIGHT;
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = BMI_CATEGORIES.NORMAL;
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        status = BMI_CATEGORIES.OVERWEIGHT;
      } else if (bmi >= 30.0) {
        status = BMI_CATEGORIES.OBESITY;
      }
      break;
    case 'Wanita':
      if (bmi < 17) {
        status = BMI_CATEGORIES.UNDERWEIGHT;
      } else if (bmi >= 17 && bmi <= 23.9) {
        status = BMI_CATEGORIES.NORMAL;
      } else if (bmi >= 23.0 && bmi <= 27.0) {
        status = BMI_CATEGORIES.OVERWEIGHT;
      } else if (bmi > 27.0) {
        status = BMI_CATEGORIES.OBESITY;
      }
      break;
  }

  return status;
};

// Fungsi untuk mendapatkan deskripsi teks berdasarkan status BMI
const getDescText = (status) => {
  if (status === BMI_CATEGORIES.UNDERWEIGHT) {
    return 'Anda memiliki berat badan kurang dari normal.';
  } else if (status === BMI_CATEGORIES.NORMAL) {
    return 'Anda memiliki berat badan dalam kisaran normal.';
  } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
    return 'Anda memiliki berat badan berlebih.';
  } else if (status === BMI_CATEGORIES.OBESITY) {
    return 'Anda memiliki berat badan yang sangat berlebih.';
  }
};

// Fungsi untuk mendapatkan teks saran berdasarkan status BMI
const getSuggestionText = (status) => {
  if (status === BMI_CATEGORIES.UNDERWEIGHT) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menambah berat badan hingga batas normal.';
  } else if (status === BMI_CATEGORIES.NORMAL) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda memiliki berat badan yang sehat.';
  } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.';
  } else if (status === BMI_CATEGORIES.OBESITY) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk mengurangi berat badan hingga batas normal.';
  }
};

// Fungsi untuk mendapatkan teks saran gizi berdasarkan status BMI
const getAdviceText = (status) => {
  if (status === BMI_CATEGORIES.UNDERWEIGHT) {
    return 'Perbanyak asupan makanan bergizi dan konsultasikan dengan ahli gizi untuk peningkatan berat badan.';
  } else if ( status === BMI_CATEGORIES.NORMAL) {
    return 'Lanjutkan gaya hidup sehat dengan pola makan seimbang dan olahraga teratur.';
  } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
    return 'Lakukan penyesuaian pola makan dan rutin berolahraga untuk menurunkan berat badan.';
  } else if (status === BMI_CATEGORIES.OBESITY) {
    return 'Segera konsultasikan dengan ahli gizi untuk penurunan berat badan yang sehat.';
  }
};

// Fungsi untuk mendapatkan daftar penyakit berdasarkan status BMI
const getDiseases = (status) => {
  if (status === BMI_CATEGORIES.UNDERWEIGHT) {
    return ['Anemia', 'Osteoporosis', 'Gangguan pertumbuhan', 'Gangguan reproduksi'];
  } else if (status === BMI_CATEGORIES.NORMAL) {
    return ['Tidak ada'];
  } else if (status === BMI_CATEGORIES.OVERWEIGHT || status === BMI_CATEGORIES.OBESITY) {
    return ['Hipertensi', 'Kolesterol tinggi', 'Jantung koroner', 'Stroke', 'Diabetes melitus', 'Kanker', 'Gangguan pernapasan', 'Gangguan reproduksi'];
  }
};

// Fungsi untuk menampilkan hasil BMI, status, saran, dan risiko penyakit
const generateDisplay = (bmi, status) => {
  const resultTitle = document.getElementById('result-title');
  resultTitle.innerText = status;
  const resultBmi = document.getElementById('result-bmi');
  resultBmi.innerText = bmi;
  const resultDesc = document.getElementById('result-desc');
  resultDesc.innerText = getDescText(status);

  const resultText = document.getElementById('result-text');
  resultText.innerText = `Hasil BMI: ${bmi}`;

  const suggestionText = document.getElementById('suggestion-text');
  suggestionText.innerText = getSuggestionText(status);

  const adviceText = document.getElementById('advice-text');
  adviceText.innerText = getAdviceText(status);

  const riskTitle = document.getElementById('risk-title')
  riskTitle.innerText = `Beberapa resiko penyakit yang berasal dari tubuh ${status}`;

  const riskList = document.getElementById('list-risk');
  riskList.innerHTML = '';

  const diseases = getDiseases(status);
  diseases.forEach((disease) => {
    const listItem = document.createElement('li');
    listItem.innerText = disease;
    riskList.appendChild(listItem);
  });

  // Menyembunyikan form dan menampilkan hasil
  document.getElementById('form').reset();
  document.getElementById('result').classList.remove('d-hidden');
  document.getElementById('home').classList.add('d-hidden');
};

// Fungsi untuk mengecek BMI dan menampilkan hasil
const checkBMI = () => {
  const weight = +document.getElementById('weight').value;
  const height = +document.getElementById('height').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const age = +document.getElementById('age').value;

  if (!validateInput(weight, height, age, gender)) {
    return;
  }

  const bmi = calculateBMI(weight, height);
  const status = checkStatus(bmi, gender);
  generateDisplay(bmi, status);

  document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
};

// Fungsi untuk mengembalikan tampilan form
const regenerateBMI = () => {
  document.getElementById('home').classList.remove('d-hidden');
  document.getElementById('result').classList.add('d-hidden');
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
};
