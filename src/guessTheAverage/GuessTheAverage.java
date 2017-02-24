package guessTheAverage;

import java.awt.Font;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Random;
import java.util.Scanner;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

public class GuessTheAverage {

    private static boolean giveup = false;
    private static boolean pause = false;

    public static void main(String[] args) throws InterruptedException {
        String title = "GuessTheAverage", EOL = System.lineSeparator();
        int totalWon = 0, totalLost = 0, sum;
        while (true) {
            Scanner input = null;
            try {
                input = new Scanner(new File("GuessTheAverageConfiguration.ini"));
            }
            catch (FileNotFoundException ex) {
                JOptionPane.showMessageDialog(null, ex, title, JOptionPane.ERROR_MESSAGE);
                return;
            }
            int labelSize = input.nextInt();
            input.nextLine();
            Font font = new Font(Font.DIALOG, Font.BOLD, labelSize);
            JLabel label = new JLabel();
            label.setFont(font);
            JFrame frame = new JFrame(title);
            frame.add(label);
            double numbersPerSecond = input.nextDouble();
            input.nextLine();
            int totalNumbers = input.nextInt();
            input.nextLine();
            int min = input.nextInt();
            input.nextLine();
            int max = input.nextInt();
            input.nextLine();
            int tolerance = input.nextInt();
            input.close();
            Random random = new Random();
            frame.setVisible(true);
            sum = 0;
            giveup = false;
            frame.addWindowListener(new WindowAdapter() {
                @Override
                public void windowClosing(WindowEvent e) {
                    giveup = true;
                    pause = false;
                }

                @Override
                public void windowGainedFocus(WindowEvent e) {
                    pause = false;
                }

                @Override
                public void windowLostFocus(WindowEvent e) {
                    pause = true;
                }
            });
            frame.addKeyListener(new KeyAdapter() {
                @Override
                public void keyPressed(KeyEvent e) {
                    if (e.getKeyCode() == KeyEvent.VK_P) {
                        pause = !pause;
                    }
                }
            });
            for (int i = 0; i < totalNumbers; i++) {
                if (giveup) {
                    break;
                }
                while (pause) {
                    Thread.sleep(500);
                }
                int n = random.nextInt(max - min + 1) + min;
                sum += n;
                label.setText("" + n);
                frame.pack();
                frame.setLocationRelativeTo(null);
                Thread.sleep((long) (1000 / numbersPerSecond));
            }
            frame.dispose();
            if (!giveup) {
                int guess = Integer.parseInt(JOptionPane.showInputDialog(null, "Guess the average!", title, JOptionPane.QUESTION_MESSAGE)), average = sum / totalNumbers;
                if (guess <= average + tolerance && guess >= average - tolerance) {
                    totalWon++;
                    JOptionPane.showMessageDialog(null, "You guessed correctly, the average was " + average, title, JOptionPane.INFORMATION_MESSAGE);
                }
                else {
                    totalLost++;
                    JOptionPane.showMessageDialog(null, "You guessed wrong, the average was " + average, title, JOptionPane.ERROR_MESSAGE);
                }
            }
            else {
                totalLost++;
            }
            int exit = JOptionPane.showConfirmDialog(null, "Do you want to continue?", title, JOptionPane.YES_NO_OPTION);
            if ((exit == 1) || (exit == -1)) {
                break;
            }
        }
        String message = "You played " + (totalWon + totalLost) + " times.";
        if (totalWon != 0) {
            message += EOL + "You won " + totalWon + " times.";
        }
        if (totalLost != 0) {
            message += EOL + "You lost " + totalLost + " times.";
        }
        JOptionPane.showMessageDialog(null, message, title, JOptionPane.INFORMATION_MESSAGE);
    }
}