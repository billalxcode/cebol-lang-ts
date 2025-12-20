# Cebol Scripting Language
**Cebol** adalah bahasa skrip sederhana (mini language) yang dibuat menggunakan **TypeScript** sebagai bentuk implementasi dasar bagaimana sebuah **interpreter** bekerja.

Menurut KBBI, kata **Cebol** yaitu:
> cebol/ce·bol/ /cébol/ a pendek sekali (tentang tubuh); katai;si -- hendak mencapai bulan (bintang), pb menghendaki sesuatu yang mustahil tercapai

Berdasarkan nama nya tersebut, maka nama proyek ini memiliki arti tujuan yaitu:
> Menjadi bahasa skripting kecil dan sederhana untuk memahami konsep inti interpreter.

> Bahasa ini hanya sebatas memahami konsep sederhana dari interpreter dan mustahil untuk mencapai kesempurnaan.

Project ini berfokus pada:
- Lexical Analysis (Lexer)
- Parsing (Parser)
- Abstract Syntax Tree (AST)
- Interpretasi (Interpreter / Evaluator)

Cebol **tidak bertujuan menggantikan bahasa lain**, tetapi sebagai media pembelajaran dan eksplorasi konsep bahasa pemrograman.

## Tujuan Proyek
- Memahami alur kerja interpretasi dari nol
- Mengimplementasikan lexer, parser, dan interpreter secara manual
- Memahami AST dan evaluasi expression
- Menjadi fondasi untuk bahasa yang lebih kompleks di masa depan

## Konsep Dasar Interpreter
![Konsep Sederhana Interpreter](diagrams/konsep-sederhana.svg)

## FItur Saat ini
- Lexer untuk:
    - Number
    - Identifier
    - Operator Aritmatika
    - Keyword dasar
    - Punctuation
- Parser dengan konsep:
    - Expression
    - Factor / Term
- AST Node Dasar
- Interpreter sederhana berbasis TypeScript

## Contoh Kode Cebol
Contoh kode Cebol bisa cek pada [folder programs](programs/)

## TODO
TODO untuk proyek Cobol bisa cek pada [TODO](TODO.md)
