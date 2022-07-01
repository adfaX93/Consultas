package com.roshka.bootcamp;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.ConnectException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet(urlPatterns = "/conexion",initParams = {@WebInitParam(name = "dbUrl", value = "jdbc:postgresql://localhost:5432/bootcamp_market"),
        @WebInitParam(name = "dbUser", value = "postgres"),
        @WebInitParam(name = "dbPassword", value = "postgres"),
})
public class ClientesServlet extends HttpServlet {
    Connection connection;

    public void init(ServletConfig config){
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection(config.getInitParameter("dbUrl"), config.getInitParameter("dbUser"),config.getInitParameter("dbPassword"));
        }catch (Exception e){
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            System.exit(0);
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response){
        response.setContentType("text/html");

        String nombre = request.getParameter("nombre");
        String apellido = request.getParameter("apellido");
        String cedula = request.getParameter("cedula");
        String telefono = request.getParameter("telefono");
        try(PrintWriter out = response.getWriter()){
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("   <head>");
            out.println("       <meta charset=\"UTF-8\">");
            out.println("       <title>Resultado Cliente</title>");
            out.println("   </head>");
            out.println("   <body>");
            out.println("       <h1>Reultados!</h1>");

            out.println("       <ul>");
            out.println("           <li>Nombre: "+nombre+"</li>");
            out.println("           <li>Apellido: "+apellido+"</li>");
            out.println("           <li>Cedula: "+cedula+"</li>");
            out.println("           <li> Telefono: "+telefono+"</li>");
            out.println("       </ul>");

            out.println("   </body>");
            out.println("</html>");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
