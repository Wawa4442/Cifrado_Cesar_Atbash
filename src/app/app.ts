import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Variables de Control
  alfabetoBase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  moduloSeleccionado: string = 'cesar';
  desplazamiento: number = 3;

  // Variables de Texto (IMPORTANTE: Estas deben estar en el HTML)
  textoCifrar: string = '';
  textoDescifrar: string = '';
  resultado: string = '';

  // Conjuntos base
  private letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private numeros = "0123456789";
  private especiales = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  // Botones de carga rápida
  setAbecedario() { this.alfabetoBase = this.letras; }
  setNumeros() { this.alfabetoBase = this.numeros; }
  setEspeciales() { this.alfabetoBase = this.especiales; }
  setComboCompleto() { this.alfabetoBase = this.especiales + this.letras + this.numeros; }

  // LÓGICA DE EJECUCIÓN
  ejecutarCifrado() {
    console.log("Cifrando:", this.textoCifrar); // Para que veas en consola que sí entra
    if (this.moduloSeleccionado === 'cesar') {
      this.resultado = this.motorCesar(this.textoCifrar, this.desplazamiento);
    } else {
      this.resultado = this.motorAtbash(this.textoCifrar);
    }
  }

  ejecutarDescifrado() {
    console.log("Descifrando:", this.textoDescifrar);
    if (this.moduloSeleccionado === 'cesar') {
      this.resultado = this.motorCesar(this.textoDescifrar, -this.desplazamiento);
    } else {
      this.resultado = this.motorAtbash(this.textoDescifrar);
    }
  }

  // MOTORES MATEMÁTICOS
  private motorCesar(texto: string, shift: number): string {
    if (!texto) return '';
    let salida = "";
    const n = this.alfabetoBase.length;
    for (let letra of texto) {
      const i = this.alfabetoBase.indexOf(letra);
      if (i === -1) {
        salida += letra;
      } else {
        let nuevoIndice = (i + Number(shift)) % n;
        if (nuevoIndice < 0) nuevoIndice += n;
        salida += this.alfabetoBase[nuevoIndice];
      }
    }
    return salida;
  }

  private motorAtbash(texto: string): string {
    if (!texto) return '';
    let salida = "";
    const n = this.alfabetoBase.length;
    for (let letra of texto) {
      const i = this.alfabetoBase.indexOf(letra);
      if (i === -1) {
        salida += letra;
      } else {
        salida += this.alfabetoBase[(n - 1) - i];
      }
    }
    return salida;
  }

  copiarResultado() {
    navigator.clipboard.writeText(this.resultado);
    alert('¡Copiado!');
  }
}