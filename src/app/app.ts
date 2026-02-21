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
  
  // 2.1 Variables de Control
  alfabetoBase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  moduloSeleccionado: string = 'cesar';
  desplazamiento: number = 3;

  // 2.2 Variables de Texto
  textoCifrar: string = '';
  textoDescifrar: string = '';
  resultado: string = '';

  // 2.3 Conjuntos Básicos
  private letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private numeros = "0123456789";
  private especiales = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  // 2.4 Botones de Carga Rápida del Alfabeto
  setAbecedario() { this.alfabetoBase = this.letras; }
  setNumeros() { this.alfabetoBase = this.numeros; }
  setEspeciales() { this.alfabetoBase = this.especiales; }
  setComboCompleto() { this.alfabetoBase = this.especiales + this.letras + this.numeros; }

  // 2.5 Función de Cifrado
  ejecutarCifrado() {
    console.log("Cifrando:", this.textoCifrar); 
    if (this.moduloSeleccionado === 'cesar') {
      this.resultado = this.motorCesar(this.textoCifrar, this.desplazamiento);
    } else {
      this.resultado = this.motorAtbash(this.textoCifrar);
    }
  }

  // 2.6 Descifrado
  ejecutarDescifrado() {
    console.log("Descifrando:", this.textoDescifrar);
    if (this.moduloSeleccionado === 'cesar') {
      this.resultado = this.motorCesar(this.textoDescifrar, -this.desplazamiento);
    } else {
      this.resultado = this.motorAtbash(this.textoDescifrar);
    }
  }

  // 2.7 Motor Matematico Cesar
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


  // 2.8 Motor Atbash
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


  // 2.9 Copiar Resultado
  copiarResultado() {
    navigator.clipboard.writeText(this.resultado);
    alert('¡Copiado!');
  }
}