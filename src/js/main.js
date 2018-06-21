function deobf() {
    try {
        let str = document.getElementById("in").value;
        if (str === "") {
            throw 'Empty';
        }
        document.getElementById("out").value = '';
        let rez = str.match(/\+CVars=([\S]+)/g);
        if (rez === null) {
            throw 'No matching parameters were found';
        }
        rez = rez.map(str => str.slice(7));
        for (let i = 0; i < rez.length; i++) {
            const tmp_1 = rez[i];
            let tmp_2 = '';
            for (let j = 0; j < tmp_1.length; j = j + 2) {
                const index = in_arr.indexOf(tmp_1.slice(j, j + 2));
                if (index === -1) {
                    throw `Unknown symbol: ${tmp_1.slice(j, j + 2)}`;
                }
                tmp_2 += out_arr[index];
            }
            str = str.replace(tmp_1, tmp_2);
        }
        document.getElementById("out").value = str;
    } catch (err) {
        alert(err);
    }
}

function obf() {
    try {
        let str = document.getElementById("out").value;
        if (str === "") {
            throw 'Empty';
        }
        document.getElementById("in").value = '';
        let rez = str.match(/\+CVars=([\S]+)/g);
        if (rez === null) {
            throw 'No matching parameters were found';
        }
        rez = rez.map(str => str.slice(7));
        for (let i = 0; i < rez.length; i++) {
            const tmp_1 = rez[i];
            let tmp_2 = '';
            for (let j = 0; j < tmp_1.length; j++) {
                const index = out_arr.indexOf(tmp_1.slice(j, j + 1));
                if (index === -1) {
                    throw `Unknown symbol: ${tmp_1.slice(j, j + 1)}`;
                }
                tmp_2 += in_arr[index];
            }
            str = str.replace(tmp_1, tmp_2);
        }
        document.getElementById("in").value = str;
    } catch (err) {
        alert(err);
    }
}