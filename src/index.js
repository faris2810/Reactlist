import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import $ from "jquery"


class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ eventName: "Hari Peringatan Laut dan Samudera nasional - 15 Januari", editable: false }
				, { eventName: "Hari Lahan Basah Sedunia - 2 Februari", editable: false }
				, { eventName: "Hari Peduli Sampah Nasional - 21 Februari[1]", editable: false }
				, { eventName: "Hari Hutan Sedunia - 21 Maret", editable: false }
				, { eventName: "Hari Air Sedunia - 22 Maret", editable: false }
				, { eventName: "Hari Meteorologi Sedunia - 23 Maret", editable: false }
				, { eventName: "Hari Bumi - 22 April", editable: false }
				, { eventName: "Hari Penanaman Pohon - Jumat terakhir di bulan April", editable: false }
				, { eventName: "Hari Burung Migratori Internasional - 3 Mei", editable: false }
				, { eventName: "Hari Surya - 3 Mei", editable: false }
				, { eventName: "Hari Biodiversitas Dunia - 22 Mei", editable: false }
				, { eventName: "Hari Bersepeda Ke Kantor (Bike-to-Work Day) - Jumat Ketiga di bulan Mei", editable: false }
				, { eventName: "Hari Anti Tembakau Internasional - 31 Mei", editable: false }
				, { eventName: "Hari Lingkungan Hidup Sedunia PBB - 5 Juni", editable: false }
				, { eventName: "Hari Melawan Desertifikasi dan Kekeringan Dunia PBB - 17 Juni", editable: false }
				, { eventName: "Hari Populasi Dunia PBB - 11 Juli", editable: false }
				, { eventName: "Hari Perlindungan Lapisan Ozon Sedunia - 16 September", editable: false }
				, { eventName: "Hari Emisi Nol (Zero Emissions Day) - 20 September", editable: false }
				, { eventName: "Hari Bebas Mobil (Car Free Day) - 22 September", editable: false }
				, { eventName: "eDay - 4 Oktober di 2008", editable: false }
				, { eventName: "Hari Habitat Dunia PBB - Senin pertama di bulan Oktober", editable: false }
				, { eventName: "Hari Pengurangan Bencana Alam Internasional - 13 Oktober", editable: false }
				, { eventName: "Hari Peringatan Sedunia untuk Mencegah Eksploitasi Lingkungan dalam Perang dan Konflik Bersenjata - 6 November", editable: false }
				, { eventName: "Hari Pohon - 21 November", editable: false }
				, { eventName: "Hari Gunung Sedunia - 11 Desember", editable: false }
				, { eventName: "Hari Aksi Ozon - Pada waktu tertentu di musim panas", editable: false }
			]
		}
	}

	render = () => {
		return (
			<table className="table">
				<thead>
					<th>Nama-Tanggal</th>
				</thead>
				<tbody>
					{this.state.data.map((data, index) => (
						<SubTable
							index={index}
							eventName={data.eventName}
							key={index}
						/>
					))}
				</tbody>
			</table>
		)
	}
}

class SubTable extends List {
	render = () => {
		const makeEditable = () => {
			let data = this.state.data;
			data[this.props.index].editable = !data[this.props.index].editable;
			this.setState({data:data});
		}
		return (
			<tr key={this.props.index}>
				<td contentEditable={this.state.data[this.props.index].editable} >{this.props.eventName}</td>
				<td><button className="btn btn-primary" onClick={makeEditable} >Edit</button></td>
			</tr>
		)
	}
}

class Card extends React.Component{
    render(){
        return(
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        {/*menampilkan  gambar/cover */}
                        <div className="col-5">
                            <img src={this.props.cover} className="img" height="200"/>
                        </div>

                        {/** menampilkan deskripsi */}
                        <div className="col-7">
                            <h5 className="text-info">
                                {this.props.judul}
                            </h5>
                            <h6 className="text-dark">
                               Penulis: {this.props.penulis}
                            </h6>
                            <h6 className="text-dark">
                               Penerbit: {this.props.penerbit}
                            </h6>
                            <h6 className="text-danger">
                               Harga: Rp {this.props.harga}
                            </h6>

                            {/** button untuk mengedit */}
                            <button className="btn btn-sm btn-primary m-1" onClick={this.props.onEdit}>
                                Edit
                            </button>

                            {/** button untuk menghapus */}
                            <button className="btn btn-sm btn-danger m-1" onClick={this.props.onDrop}>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//menyambungkan
class Olshop extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            buku: [
                {
                    isbn: "12345", judul:"bulan", penulis:"tere liye",penerbit:"CV Harapan Kita", harga: 90000, cover:"https://drive.google.com/uc?id=1ui-jyKgu3DqFyo7VKJu-FFXkaNQN3aSg"
                },
                {
                    isbn: "12346", judul:"anak badai", penulis:"tere liye",penerbit:"CV Nusa", harga: 85000, cover:"https://drive.google.com/uc?id=1rJDcCOmsd14NL6DG3Wps_kewZomGcLU-"
                },
            ],

            action: " ",
            isbn: " ",
            judul: " ",
            penulis: " ",
            penerbit: " ",
            harga: 0,
            cover: "",
            selectedItem: null,
            keyword: "",
            filterBuku: []
        }

        this.state.filterBuku = this.state.buku
    }

    // fungsi menabah data
    Add = () => {
        //menampilkan komponen modal nya
        $("#modal_buku").modal("show")

        //mengosong data setelah ditambahkan
        this.setState({
            isbn: Math.random(1, 10000),
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }

    //fungsi edit
    Edit = (item) => {
        //menampilkan komponen modal nya
        $("#modal_buku").modal("show")

        //form control
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item,   
        })
    }

    //fungsi save
    Save = (event) => {
        event.preventDefault();
        //perintah menampung data state buku
        let tempBuku = this.state.buku

        //membagi kondisi 
        if (this.state.action === "insert") {
            //menambah data baru
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            })
        } else if(this.state.action === "update"){
            //menyimpan perubahan baru
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn = this.state.isbn
            tempBuku[index].judul = this.state.judul
            tempBuku[index].penulis = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].cover = this.state.cover
            tempBuku[index].harga = this.state.harga
        }
        //mengembalikan variabel buku
        this.setState({buku: tempBuku})

        //menutup komponen modal_buku
        $("#modal_buku").modal("hide")
    }

    //fungsi untuk menhapus
    Drop = (item) => {
        //beri konfirmasi untuk menghapus data
        if(window.confirm("apakah anda yakin ingin menghapus data ini?")){
            //menghapus data
            let tempBuku = this.state.buku

            //posisi index data yang akan dihapus
            let index = tempBuku.indexOf(item)

            //settelah menemukan hapus data
            tempBuku.splice(index, 1)

            //kembalikan data ke state buku
            this.setState({buku: tempBuku})
        }
    }

    //fungsi utnuk pencarian
    searching = event => {
        if(event.keyCode === 13){
            //13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLocaleLowerCase()
            let tempBuku = this.state.buku
            //menampung filter
            let result = tempBuku.filter(item => {
                return item.judul.toLocaleLowerCase().includes(keyword) || item.penulis.toLocaleLowerCase().includes(keyword) || item.penerbit.toLocaleLowerCase().includes(keyword)
            })
            // menampilkan data dari variabel result
            this.setState({filterBuku: result})
        }
    }


    render(){
        return(
            <div className="container">
            <input type="text" className="form-control my-2" placeholder="pencarian" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
               <div className="row">
                    {this.state.filterBuku.map( (item, index) => (
						console.log(item),
                        <Card 
                            judul={ item.judul}
                            penulis={ item.penulis}
                            penerbit={ item.penerbit}
                            harga= { item.harga}
                            cover= {item.cover}
                            onEdit={ () => this.Edit(item)}
                            onDrop={ () => this.Drop(item)}
                        />
                    ))}
               </div>
               <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
               </button>

               {/** component model sbg control manipulasi data */}
                <div className="modal" id="modal_buku">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/** modal header */}
                            <div className="modal-header">
                                Form Buku
                            </div>

                            {/** modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Judul Buku
                                    <input type="text" className="form-control mb-2" value={this.state.judul} onChange={ev => this.setState({judul: ev.target.value})} required/>

                                    Penulis Buku
                                    <input type="text" className="form-control mb-2" value={this.state.penulis} onChange={ev => this.setState({penulis: ev.target.value})} required/>

                                    Penerbit
                                    <input type="text" className="form-control mb-2" value={this.state.penerbit} onChange={ev => this.setState({penerbit: ev.target.value})} required/>

                                    Harga Buku
                                    <input type="number" className="form-control mb-2" value={this.state.harga} onChange={ev => this.setState({harga: ev.target.value})} required/>

                                    Cover Buku
                                    <input type="url" className="form-control mb-2" value={this.state.cover} onChange={ev => this.setState({cover: ev.target.value})} required/>

                                    <button className="btn btn-info btn-block" type="submit">Simpan</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

class Navbar extends React.Component{
    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container">
                    <a class="navbar-brand text-white click1" href="#">Tugas</a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item click">
                                <Link to="/list" className="nav-link text-white">list</Link>
                            </li>
                            <li class="nav-item click">
                                <Link to="/olshop" className="nav-link text-white">shop</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}


class App extends React.Component{
	constructor(props){
		super(props);
	}
	render = () => {
		return(
			<BrowserRouter>
				<Navbar/>

				<Switch>
					<Route path="/olshop">
						<Olshop/>
					</Route>
					<Route path="/list">
						<List/>
					</Route>
				</Switch>
			</BrowserRouter>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("root"))


