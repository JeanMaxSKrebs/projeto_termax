cmake_minimum_required(VERSION 3.4.1)

# Define o nome do projeto
project(MyAndroidProject)

# Adiciona um executável
add_library( native-lib
             SHARED
             src/main/cpp/native-lib.cpp )

# Inclua diretórios adicionais se necessário
include_directories(src/main/cpp/include)

# Define as bibliotecas e dependências que seu projeto precisa
find_library( log-lib
              log )

# Vincula a biblioteca `native-lib` com a biblioteca `log` do Android
target_link_libraries( native-lib
                       ${log-lib} )
